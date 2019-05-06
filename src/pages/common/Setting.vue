<template>
<!--  <el-card>-->
    <div flex="box:first">
      <el-menu
        default-active="/setting/address"
        :router="true"
        class="el-menu-vertical-demo">
        <el-menu-item disabled index="1">
          <i class="el-icon-edit"></i>
          <span slot="title">个人资料</span>
        </el-menu-item>
        <el-menu-item index="/setting/security">
          <i class="el-icon-setting"></i>
          <span slot="title">密码设置</span>
        </el-menu-item>
        <el-menu-item index="/setting/address">
          <i class="el-icon-location"></i>
          <span slot="title">收货地址</span>
        </el-menu-item>
        <el-menu-item disabled index="4">
          <i class="el-icon-phone"></i>
          <span slot="title">帮助与客服</span>
        </el-menu-item>
      </el-menu>
      <div class="m-l-20"><router-view></router-view></div>
    </div>
<!--  </el-card>-->
</template>

<style lang="scss">
.el-menu-vertical-demo {
  width: 200px !important;
}
</style>
