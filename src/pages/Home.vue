<template>
  <div class="home">
    <div>首页</div>
    <div v-for="item in users" :key="item.id">
      <div>用户名：{{item.name}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{
      users:''
    }
  },
  components: {
    
  },
  created(){
    this.userfindAll();
  },

  methods:{
    userfindAll(){
      let params = {
        page:1,
        pageSize:10
      }
      this.$axios.get(this.$APIURL.userfindAll,params).then(res=>{
        console.log(res)
        this.users = res.data.data.rows
      })
    }
  }
}
</script>
