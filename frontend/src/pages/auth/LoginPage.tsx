import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import TextInput from "../../components/input/text/TextInput.tsx";
import ErrorMessage from "../../components/error-message/ErrorMessage.tsx";
import Button from "../../components/button/Button.tsx";
import "./LoginPage.css";
import { useAuth } from "../../auth/AuthProvider.tsx";

const LoginPage = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <div className="content">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          className="title-gradient"
          style={{ textAlign: "center", cursor: "auto" }}
        >
          aspect
        </span>
      </div>
      <h1 className="card-h1">Login to your account</h1>
      <form onSubmit={handleLogin}>
        <TextInput
          id="email"
          inputType="email"
          autocomplete={false}
          label="Email address"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          id="password"
          inputType="password"
          autocomplete={false}
          label="Password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <ErrorMessage message={errorMessage || ""} />

        <div className="btn-wrapper">
          <Button value="Login" type={"primary"} onClick={handleLogin} />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from "react";
// // import { useMutation } from "@apollo/client";
// import { gql } from "@apollo/client/core";
// import { useNavigate } from "react-router";
// import TextInput from "../../components/input/text/TextInput.tsx";
// import ErrorMessage from "../../components/error-message/ErrorMessage.tsx";
// import Button from "../../components/button/Button.tsx";
// import "./LoginPage.css";
// import {useAuthenticateUserWithPasswordMutation} from "../../generated/graphql.tsx";
//
// const LOGIN_MUTATION = gql`
//   mutation Login($email: String!, $password: String!) {
//     authenticateUserWithPassword(email: $email, password: $password) {
//       __typename
//       ... on UserAuthenticationWithPasswordSuccess {
//         item {
//           id
//           email
//         }
//       }
//       ... on UserAuthenticationWithPasswordFailure {
//         message
//       }
//     }
//   }
// `;
//
// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();
//   // const [login] = useMutation(LOGIN_MUTATION);
//
//   useAuthenticateUserWithPasswordMutation()
//
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//
//     try {
//       // const { data } = await login({
//       //   variables: { email, password },
//       // });
//       const data = {} as any;
//
//       if (
//         data?.authenticateUserWithPassword?.__typename ===
//         "UserAuthenticationWithPasswordSuccess"
//       ) {
//         // Redirect to another page (e.g., dashboard)
//         navigate("/dashboard");
//       } else {
//         setErrorMessage(
//           data?.authenticateUserWithPassword?.message || "Login failed",
//         );
//       }
//     } catch (error) {
//       setErrorMessage("An unexpected error occurred. Please try again.");
//       console.error(error);
//     }
//   };
//
//   return (
//     <div className="content">
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <span
//           className="title-gradient"
//           style={{ textAlign: "center", cursor: "auto" }}
//         >
//           aspect
//         </span>
//       </div>
//       <h1 className="card-h1">Login to your account</h1>
//       <form>
//         {/*<Select*/}
//         {/*  id="project-select"*/}
//         {/*  label="Choose an existing project:"*/}
//         {/*  value={selectedProject}*/}
//         {/*  onChange={(e: any) => {*/}
//         {/*    setSelectedProject(e.target.value);*/}
//         {/*    setNewProject("");*/}
//         {/*    setError("");*/}
//         {/*  }}*/}
//         {/*  options={projects.map((project: Project) => {*/}
//         {/*    return { value: project.id, label: project.project_name };*/}
//         {/*  })}*/}
//         {/*  defaultOption="-- Select project --"*/}
//         {/*/>*/}
//         <TextInput
//           id="email"
//           inputType="email"
//           autocomplete={false}
//           label="Email address"
//           value=""
//           placeholder="Enter your email address"
//           // onChange={(e) => {
//           //   setNewProject(e.target.value);
//           //   setSelectedProject("");
//           //   setError("");
//           // }}
//         />
//
//         <TextInput
//           id="email"
//           inputType="password"
//           autocomplete={false}
//           label="Password"
//           value=""
//           placeholder="Enter your password"
//           // onChange={(e) => {
//           //   setNewProject(e.target.value);
//           //   setSelectedProject("");
//           //   setError("");
//           // }}
//         />
//
//         <ErrorMessage message={""} />
//
//         <div className="btn-wrapper">
//           <Button value="Login" type={"primary"} onClick={() => {}} />
//         </div>
//       </form>
//     </div>
//   );
//
//   // return (
//   //   <div className="login-page">
//   //     <h1>Login</h1>
//   //     <form onSubmit={handleLogin} className="login-form">
//   //       <div className="form-group">
//   //         <label htmlFor="email">Email:</label>
//   //         <input
//   //           type="email"
//   //           id="email"
//   //           name="email"
//   //           value={email}
//   //           onChange={(e) => setEmail(e.target.value)}
//   //           required
//   //         />
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="password">Password:</label>
//   //         <input
//   //           type="password"
//   //           id="password"
//   //           name="password"
//   //           value={password}
//   //           onChange={(e) => setPassword(e.target.value)}
//   //           required
//   //         />
//   //       </div>
//   //       {errorMessage && <p className="error-message">{errorMessage}</p>}
//   //       <button type="submit">Login</button>
//   //     </form>
//   //   </div>
//   // );
// };
//
// export default LoginPage;
