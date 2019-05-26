<template>
  <v-app id="login">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue-grey darken-2">
              <v-toolbar-title>SIGN IN</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon large>
                <v-icon large>code</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-form>
                <v-radio-group row prepend-icon="person"  v-model="userType">
                    <v-radio label="customer" value="customer"></v-radio>
                    <v-radio label="shop" value="shop"></v-radio>
                    <v-radio label="manager" value="manager"></v-radio>
                </v-radio-group>
                <v-text-field
                  v-model="email"
                  :prepend-icon="userType=='customer'||userType=='manager'?'email':'home'"
                  name="email"
                  :label="userType=='customer'||userType=='manager'?'email':'shopId'"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  @keyup.enter="submit"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                ></v-text-field>
                
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn to="/yummy/register" flat>
                <v-icon>arrow_back</v-icon>sign up
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue-grey darken-2" class="white--text" @click="submit">sign in</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// import axios from "@/plugins/axios";
export default {
  data() {
    return {
      userType: "customer",
      email: "",
      password: ""
    };
  },
  methods: {
    submit: function() {
      const password = this.password;
      const vue=this
      axios
        .post("/api/login", {
          userType:this.userType,
          email: this.email,
          password: password
        })
        .then(res => {
          if (res.data.status === "success") {
            alert('hhh');
          } else {
            alert(res.data.message);
          }
        });
    }
  }
};
</script>

<style>
</style>
