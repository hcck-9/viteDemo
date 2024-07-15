import path from "path";
import { normalizePath } from "vite";

const variablePath = normalizePath(path.resolve("./src/variable.scss"));

console.log(variablePath, path.resolve("./src/variable.scss"));
