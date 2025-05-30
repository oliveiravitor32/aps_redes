<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { authService } from "../../services/auth.service";

const router = useRouter();

const username = ref<string>("");
const password = ref<string>("");
const passwordConfirm = ref<string>("");
const registrationError = ref<string | null>(null);
const registrationSuccess = ref<boolean>(false);
const registrationMessage = ref<string | null>(null);

const register = async () => {
  registrationError.value = null;
  registrationSuccess.value = false;
  registrationMessage.value = null;

  if (password.value !== passwordConfirm.value) {
    registrationError.value = "As senhas não coincidem.";
    return;
  }

  try {
    // 1. Verificar se o nome de usuário já existe
    const userExists = await authService.checkUsernameExists(username.value);

    if (userExists) {
      registrationError.value = "Este nome de usuário já está em uso.";
      return;
    }

    // 2. Se o nome de usuário não existe, prosseguir com o registro
    const response = await authService.register({
      username: username.value,
      password: password.value,
    });

    if (response) {
      registrationSuccess.value = true;
      registrationMessage.value = response;
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      registrationError.value = "Erro ao registrar o usuário.";
    }
  } catch (error: any) {
    console.error("Erro durante o registro:", error);
    registrationError.value = error.message || "Erro ao conectar com o servidor.";
  }
};
</script>
<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <img
      class="w-[260px] h-auto mb-4"
      src="../../assets/EcoVerde_Preto.png"
      alt="Logo"
    />
    <form
      @submit.prevent="register"
      class="bg-white p-7 w-full sm:w-100 h-125 rounded-lg shadow-lg flex flex-col gap-4 justify-center"
    >
      <legend class="font-bold text-center text-2xl mb-6">Criar conta</legend>
      <div class="flex flex-col">
        <label
          for="signup-username"
          class="text-gray-800 text-sm font-bold mb-1"
          >Nome de usuário:
        </label>
        <input
          v-model="username"
          autocomplete="username"
          type="text"
          name="signup-username"
          id="signup-username"
          class="invalid:outline-red-400 border-2 text-sm border-gray-300 rounded-md p-2 outline-green-500"
          placeholder="Digite seu nome de usuário"
          required
        />
    <p v-if="registrationError" class="text-red-500 text-sm mt-1">{{ registrationError }}</p>
      </div>
      <div class="flex flex-col">
        <label
          for="signup-password"
          class="text-gray-800 text-sm font-bold mb-1 outline-green-500"
          >Senha:
        </label>
        <input
          v-model="password"
          autocomplete="new-password"
          type="password"
          name="signup-password"
          id="signup-password"
          class="invalid:outline-red-400 border-2 text-sm border-gray-300 rounded-md p-2 outline-green-500"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <div class="flex flex-col">
        <label
          for="signup-password-confirm"
          class="text-gray-800 text-sm font-bold mb-1 outline-green-500"
          >Confirmar senha:
        </label>
        <input
          v-model="passwordConfirm"
          autocomplete="new-password"
          type="password"
          name="signup-password-confirm"
          id="signup-password-confirm"
          class="invalid:outline-red-400 border-2 text-sm border-gray-300 rounded-md p-2 outline-green-500"
          placeholder="Confirme sua senha"
          required
          />
      </div>
      <button
        class="bg-gray-900 text-sm text-white py-1.5 hover:cursor-pointer hover:opacity-90 rounded-sm"
      >
        Criar conta
      </button>

      <p class="text-center text-sm">
        Já possuí uma conta?
        <RouterLink class="text-green-500 font-bold hover:text-green-600" to="/"
          >Entrar</RouterLink
        >
      </p>
    </form>
  </div>
</template>
