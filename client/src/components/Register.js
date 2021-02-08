import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/auth.action";

export const Register = ({ backToLogin }) => {
  const dispatch = useDispatch();
  const { isRequest } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Поле обязательно для заполнения"),
      email: Yup.string()
        .email("Некоректный Email адрес")
        .required("Поле обязательно для заполнения"),
      password: Yup.string()
        .min(6, "Минимальная длина 6 символов")
        .required("Поле обязательно для заполнения"),
      confirmPass: Yup.mixed().test({
        message: "Пароли не совпадают",
        test: (value) => value === formik.values.password,
      }),
    }),
    onSubmit: async (values) => {
      let isAuth = await dispatch(register(values));
      if (isAuth) backToLogin();
    },
  });

  const btnDisabled = useMemo(() => {
    return (
      Object.keys(formik.errors).length ||
      !Object.keys(formik.touched).length ||
      isRequest
    );
  }, [formik, isRequest]);

  return (
    <div className="tab-auth-body">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${
              formik.touched.name && formik.errors.name && "border-danger"
            }`}
            id="exampleInputName"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <small className="form-text text-danger">
              {formik.errors.name}
            </small>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email && "border-danger"
            }`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <small className="form-text text-danger">
              {formik.errors.email}
            </small>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${
              formik.touched.password &&
              formik.errors.password &&
              "border-danger"
            }`}
            id="exampleInputPassword1"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <small className="form-text text-danger">
              {formik.errors.password}
            </small>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input
            type="password"
            name="confirmPass"
            className={`form-control ${
              formik.touched.confirmPass &&
              formik.errors.confirmPass &&
              "border-danger"
            }`}
            id="exampleInputPassword2"
            onChange={formik.handleChange}
            value={formik.values.confirmPass}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPass && formik.errors.confirmPass ? (
            <small className="form-text text-danger">
              {formik.errors.confirmPass}
            </small>
          ) : null}
        </div>
        <button type="submit" className="btn" disabled={btnDisabled}>
          {isRequest && (
            <span className="spinner-border spinner-border-sm mr-2"></span>
          )}
          Создать аккаунт
        </button>
      </form>
    </div>
  );
};
