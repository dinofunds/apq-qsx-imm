import { ref } from "vue";

import captcha1 from "../assets/images/captcha1.jpeg";
import captcha2 from "../assets/images/captcha2.jpeg";
import captcha3 from "../assets/images/captcha3.jpeg";
import captcha4 from "../assets/images/captcha4.jpeg";
import captcha5 from "../assets/images/captcha5.jpeg";

const useCaptchas = () => {
  const captchas: { [x: number]: { image: any; value: string } } = {
    1: {
      image: captcha1,
      value: "2ngbf",
    },
    2: {
      image: captcha2,
      value: "gnxnn",
    },
    3: {
      image: captcha3,
      value: "nxff7",
    },
    4: {
      image: captcha4,
      value: "f77nx",
    },
    5: {
      image: captcha5,
      value: "yp954",
    },
  };

  const currentCaptcha = ref({
    image: captcha1,
    value: "12345",
  });

  const randomCaptcha = () => {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    currentCaptcha.value = captchas[randomNumber];
  };

  return {
    randomCaptcha,
    currentCaptcha,
  };
};

export default useCaptchas;
