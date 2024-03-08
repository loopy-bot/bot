import axios from "axios";

export const generate = (prefix, prompt) => {
    return axios
        .post("http://localhost:8766/generate", { prefix, prompt })
        .then((res) => res.data);
};
export const chat = (messages) => {
    return axios
        .post("http://localhost:8766/chat", { messages })
        .then((res) => res.data);
};
