import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring";
import { connect } from "react-redux";
import { Form, Field, withFormik } from "formik";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { TextField } from "formik-material-ui";
import { addItem } from "../actions";
import * as Yup from "yup";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  form: {
    display: "flex",
    flexDirection: "column"
  }
}));

const addItemForm = () => {
  return (
    <Form>
      <Field component={TextField} name="title" label="Title" fullWidth/>
      <Field
        component={TextField}
        name="desc"
        label="Description"
        multiline
        rows="4"
        fullWidth
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        fullWidth
      >
        Save
      </Button>
    </Form>
  );
};

const ModalFormik = withFormik({
  mapPropsToValues({ title, desc }) {
    return {
      title: title || "",
      desc: desc || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("A title is required"),
    password: Yup.string().required("A desc is required")
  }),

  handleSubmit(values, { props }) {
    props.addItem({title: values.title, descriptiom: values.desc})
  }
})(addItemForm);

const mapStateToProps = state => {
  return {};
};

const ModalForm = connect(
  mapStateToProps,
  { addItem }
)(ModalFormik);

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function AddItemModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="add new item"
        color="inherit"
        onClick={handleOpen}
      >
        <AddIcon />
      </IconButton>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <ModalForm />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
