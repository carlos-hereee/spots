// import ReactGA from "react-ga"
import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import LoginForm from "./LoginForm";
import { AuthContext } from "../../context/";
import { Formik } from "formik";
import * as Yup from "yup";
// import SignNavbar from "../../components/Navbar/signinnav"

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	image: {
		width: "100%",
		height: "100%",
	},
}));

const Login = ({ history }) => {
	//   ReactGA.pageview(window.location.pathname + window.location.search)
	const {
		accessToken,
		isLoading,
		signInError,
		signInWithUserIdAndPassword,
		signInWithGoogle,
	} = useContext(AuthContext);

	const classes = useStyles();

	useEffect(() => {
		if (accessToken) {
			history.push("/admin-dashboard");
		}
	}, [accessToken]);

	const AdminLoginSchema = Yup.object().shape({
		userId: Yup.string().required("User ID is required."),
		password: Yup.string()
			.min(6, "Password must be greater 6 characters.")
			.required("Password is required."),
	});

	return (
		<div className={classes.root}>
			{/* <SignNavbar /> */}
			<Grid container>
				<Grid item md={6} style={{ background: "#A35629" }}></Grid>
				<Grid item md={6}>
					<Formik
						initialValues={{ userId: "", password: "" }}
						onSubmit={(values, actions) => {
							// ReactGA.event({
							// 	category: "Sign In",
							// 	action: "Existing User Signed In",
							// });
							signInWithUserIdAndPassword(values);
							actions.resetForm();
						}}
						render={formikProps => (
							<LoginForm
								{...formikProps}
								isLoading={isLoading}
								signInError={signInError}
								signInWithGoogle={signInWithGoogle}
							/>
						)}
						validationSchema={AdminLoginSchema}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Login;
