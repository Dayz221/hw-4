import React from "react";

import styles from "./LoginPage.module.scss";
import Text from "../../components/Text";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router";
import rootStore from "../../store/RootStore";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [identifier, setIdentifier] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

    const onLogin = () => {
        setError("");

        if (!identifier || !password) {
            setError("All fields are required");
            return;
        }

        rootStore.user
            .loginUser({ identifier, password })
            .then(() => {
                if (rootStore.user.meta !== "success") {
                    setError("Login failed");
                    return;
                }
                navigate("/");
            })
            .catch((err) => {
                setError("Login failed");
                console.log(err);
            });

    }

    return (
        <>
            <div className={styles.login_container}>
                <Text align="center" view="p-32" weight="bold" tag="h1">Login</Text>
                <Input value={identifier} onChange={setIdentifier} className={styles.input} placeholder="Email or Username" />
                <Input value={password} onChange={setPassword} className={styles.input} placeholder="Password" type="password" />
                <Button onClick={onLogin}>Login</Button>

                <Link to="/register">
                    <Text align="center" view="p-14" weight="normal" color="secondary">Don't have an account? Register</Text>
                </Link>

                <div className={styles.error_message}>
                    <Text align="center" view="p-14" weight="bold">{error}</Text>
                </div>
            </div>
        </>
    )
}

export default LoginPage;