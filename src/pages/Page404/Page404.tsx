import type React from "react";
import Text from "../../components/Text";
import Image from "../../components/Image";

const Page404: React.FC = () => {
    return (
        <div style={{ position: "absolute", top: "10vh", left: "50%", transform: "translate(-50%, 0)" }}>
            <div style={{ display: "flex", gap: "30px", alignItems: "center", flexWrap: "wrap" }}>
                <Image width="250px" height="300px" src="https://avatanplus.com/files/resources/original/5745831bb158a154e788244e.png" />
                <div>
                    <Text view="title" tag="h1" weight="bold">Oooooops... 404</Text>
                    <Text view="p-20" color="secondary">Page not fount,<br /> check your URL and try again!</Text>
                </div>
            </div>
        </div>
    )
}

export default Page404;