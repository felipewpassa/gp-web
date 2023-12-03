<script setup lang="ts">

</script>

<template>
  <main>
    <div class="col-md-6 mx-auto justify-content-center">
      <div class="card">
        <div class="card-header">
          Faça o login
        </div>
        <form class="p-3">
          <div class="mb-3">
            <label 
              for="email" 
              class="form-label"
            >
              Email
            </label>
            <input 
              id="email" 
              type="email" 
              class="form-control" 
              placeholder="Digite seu e-mail"
              value="felipe@teste.com"
            >
          </div>
        
          <div class="mb-3">
            <label 
              for="password" 
              class="form-label"
            >
              Senha
            </label>
            <input 
              id="password" 
              type="password" 
              class="form-control" 
              placeholder="Digite sua senha"
              value="password"
            >
          </div>

          <div class="d-flex justify-content-end">
            <button 
              type="button" 
              class="btn btn-dark"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
