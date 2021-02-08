import React, { useMemo } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/auth.action";
import * as Yup from "yup";

export const Login = () => {
  const dispatch = useDispatch();
  const { isRequest } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      checkbox: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Некоректный Email адрес")
        .required("Поле обязательно для заполнения"),
      password: Yup.string()
        .min(6, "Минимальная длина 6 символов")
        .required("Поле обязательно для заполнения"),
    }),
    onSubmit: async (values) => {
      await dispatch(login(values));
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
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email && "border-danger"
            }`}
            id="exampleInputEmail1"
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
        <div className="form-group form-check">
          <input
            type="checkbox"
            name="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={formik.handleChange}
            value={formik.values.checkbox}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Запомнить
          </label>
        </div>
        <button type="submit" className="btn" disabled={btnDisabled}>
          {isRequest && (
            <span className="spinner-border spinner-border-sm mr-2"></span>
          )}
          Войти
        </button>
      </form>
    </div>
  );
};
