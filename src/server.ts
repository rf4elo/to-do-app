import App from "./app.ts";
import { config } from "dotenv";

config();


const PORT = 3000;

App.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
