<template>
  <div id="app">
    <h1>오늘 점심 뭐먹지?</h1>
    <div class="region">
      <select name="region" class="regeion-select" v-model="region">
        <option value="null" selected>지역을 선택해주세요.</option>
        <option value="강남">강남구</option>
        <option value="마포구">마포구(준비중)</option>
      </select>
    </div>
    <div class="type">
      <select name="type" class="type-select" v-model="restaruantType">
        <option value="null" selected>종류를 선택해주세요.</option>
        <option value="한식">한식</option>
        <option value="일식">일식</option>
        <option value="중식">중식</option>
        <option value="양식">양식</option>
        <option value="카페">카페</option>
        <option value="술집">술집</option>
      </select>
    </div>
    <button @click="fetchData">클릭</button>
    <table>
      <thead>
        <tr class="table__column-title">
          <th scope="col">식당명</th>
          <th scope="col">평점</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in restaruant" :key="result">
          <td>{{ result.title }}</td>
          <td>{{ result.rate }}</td>
        </tr>
      </tbody>
    </table>

    <!-- <router-view /> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      region: null,
      restaruantType: null,
      restaruant: null,
    };
  },
  methods: {
    async fetchData() {
      const { data } = await axios({
        method: 'get',
        // TODO: 어디로 요청해야할 지 모르겠어용 ^_^....
        url: 'http://localhost:3000/api/random',
        data: { category: this.restaruantType, region: this.region },
      });
      // console.log(data);
      this.restaruant = data;
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
}

select {
  width: 200px;
  padding: 0.8em 0.5em;
  border: 1px solid #999;
  font-family: inherit;
  /* background: url('arrow.jpg') no-repeat 95% 50%; */
  border-radius: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 5px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

select::-ms-expand {
  display: none;
}

button {
  width: 200px;
  padding: 0.8em 0.5em;
  border: 1px solid #999;
  font-family: inherit;
  border-radius: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

table {
  width: 100%;
  border-bottom: 1px solid #444444;
  margin-top: 50px;
}
</style>
