<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini"></el-button>
      <h3 style="{ color: #fff; }">首页</h3>
      <!-- <el-breadcrumb>
          <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb> -->
    </div>
    <div class="r-content">
        <el-dropdown trigger="click" size="mini">
            <span>
                <img class="user" :src="userImg">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </header>
  
</template>

<script>
export default {
    name: 'CommonHeader',
    data() {
        return {
            userImg: require('../assets/images/user.png')
        }
    },
    methods: {
        
    }

}
</script>

<style lang="less" scoped>

header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    .l-content {
        display: flex;
        align-items: center;
        .el-button {
            // width: 50px;
            // height: 30px;
            margin-right: 20px;
        }
    }
    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}

</style>