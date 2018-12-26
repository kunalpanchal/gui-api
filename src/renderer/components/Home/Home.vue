<template >
  <div id="wrapper">
    <div id="content">
      <div class="card header">
        <i v-on:click="exportedJSON.language='javascript'" v-bind:style="{color:exportedJSON.language=='javascript'?'white':'#dcdcdc'}" class="lang devicon-javascript-plain"></i>
        <i style="margin-left: 130px" v-on:click="exportedJSON.language='python'" v-bind:style="{color:exportedJSON.language=='python'?'white':'#dcdcdc'}" class="lang devicon-python-plain-wordmark"></i>
        <h1 style="text-align:right;margin:0px;margin-bottom:10px;color:white">My awesome API</h1>
        <div class="api-head-wrapper">
          <div class="card api-head">
            <span>Compression</span>
            <div class="switch" style="align-self: flex-end;">
              <label>
                Off
                <input v-model="exportedJSON.compression" type="checkbox">
                <span class="lever"></span>
                On
              </label>
            </div>
          </div>
          <div class="card api-head">
            <span>CORS</span>
            <div class="switch" style="align-self: flex-end;">
              <label>
                Off
                <input v-model="exportedJSON.cors" type="checkbox">
                <span class="lever"></span>
                On
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="api" v-for="(api,index) in apis">
        <div class="card api-card" v-on:click="httpMethod(api,index)" v-bind:style="{ backgroundColor: apiMethodColors[api.httpMethod]}">
          <span>{{api.httpMethod}}</span>
        </div>
        <div class="card api-card" v-on:click="route(api,index)">
          <span>{{api.route}}</span>
        </div>
        <div class="card api-card" v-if="api.code" v-on:click="code(api,index)">
          <span v-bind:style="{width:'140px'}">{ code }</span>
        </div>
        <div class="card api-card" v-if="api.cors">
          <span>CORS</span>
        </div>
        <div class="card api-card" v-if="api.rateLimiter" v-on:click="rateLimiter()">
          <span v-bind:style="{width:'200px'}">Rate Limiter</span>
        </div>
        <div class="card api-card" v-if="api.httpParams">
          <span>Params</span>
        </div>
        <div class="card api-card" v-if="api.httpQuery">
          <span>Query</span>
        </div>
        <div class="card api-card" v-if="api.httpBody">
          <span>Body</span>
        </div>
        <div class="card api-card" style="border-radius:300px;min-width: 40px" v-on:click="addAPIFeatures(api,index)">
          <span style="font-size: 40px;">+</span>
        </div>
      </div>

      <div style="display:flex;flex-direction:row;adjust-content:center;justify-content:center;margin-top:60px">
        <div class="card api-card" style="align-self: center;padding:20px;" v-on:click="addNewAPI()">
          <span>ADD NEW API</span>
        </div>
        <div class="card api-card" style="align-self: center;padding:20px;background-color:forestgreen" v-on:click="addNewAPI()">
          <i class="material-icons" style="line-height: 1;align-self: center;color:white">play_arrow</i>
        </div>
        <div class="card api-card" style="align-self: center;padding:20px;background-color:orangered" v-on:click="addNewAPI()">
          <!-- <span>Run</span> -->
          <i class="material-icons" style="line-height: 1;align-self: center;color:white">cloud_download</i>
        </div>
      </div>
    </div>
    <div class="bottom-footer">
      <span>APIs Count {{apis.length}} | CORS {{exportedJSON.cors?'enabled':'disabled'}} | Compression {{exportedJSON.compression?'enabled':'disabled'}}</span>
    </div>
  </div>
</template>

<script src="./home.js">
</script>

<style lang="scss">
  @import "home.scss";
</style>
