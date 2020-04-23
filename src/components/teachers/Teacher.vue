<template>
	<div class="teacher">
		
		<el-container>
		  <el-header>
		  	<span>起航一中教师档案后台管理系统</span>
		  	<el-button type="danger" @click="logout">退出登录</el-button>
		  </el-header>
		  <el-container>
		    <el-aside :width="isCollapse? '64px' : '199px'">
					<el-popover placement="right" width="200" trigger="hover" title="提示" content="点击按钮可以展开/折叠侧边栏">
						<el-button type="primary" class="foldbtn" @click="fold" slot="reference">|||</el-button>
					</el-popover>
					<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="true">
					  <el-submenu index="1">
					    <template slot="title">
					      <i class="el-icon-user"></i>
					      <span slot="title">个人管理</span>
					    </template>
					    <el-menu-item index="1-1" :index="personalinforpath">个人信息</el-menu-item>
					    <el-menu-item index="1-2" :index="alterpasswordpath">修改密码</el-menu-item>
					  </el-submenu>
						<el-submenu index="2">
					    <template slot="title">
					      <i class="el-icon-folder-opened"></i>
					      <span slot="title">档案管理</span>
					    </template>
					    <el-menu-item-group title="分组1">
					      <el-menu-item index="2-1" :index="basicfileinforpath">基本档案</el-menu-item>
					    </el-menu-item-group>
					    <el-menu-item-group title="分组2">
								<el-menu-item index="2-2" :index="teachflieinforpath">教学档案</el-menu-item>
					      <el-menu-item index="2-3" :index="researchfileinforpath">科研档案</el-menu-item>
								<el-menu-item index="2-4" :index="learnfileinforpath">学术档案</el-menu-item>
					    </el-menu-item-group>
					  </el-submenu>
					</el-menu>
				</el-aside>
		    <el-main>
					<!-- 路由占位符 -->
					<router-view></router-view>
				</el-main>
		  </el-container>
		</el-container>
		
	</div>
</template>

<script>
	export default {
		name: 'Teacher',
		data() {
			return {
				selfinforobj: {},
				isCollapse: false,
				isOpened: false,
				personalinforpath: '/teacher/personalinfor',
				basicfileinforpath: '/teacher/basicfileinfor',
				teachflieinforpath: '/teacher/teachflieinfor',
				researchfileinforpath: '/teacher/researchfileinfor',
				learnfileinforpath:'/teacher/learnfileinfor',
				alterpasswordpath: '/teacher/alterpassword'
			}
		},
		methods: {
			// 折叠按钮
			fold() {
				this.isCollapse = !this.isCollapse;
			},
			// 折叠
			 handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			// 获取本地信息
			getSelfInforList() {
				this.$http.get('personalinfor').then(res => {
					this.selfinforobj = res.data[0];
				})
			},
			// 退出登录
			logout() {
				this.$confirm('此操作将退出当前登录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '已退出当前登录!'
					});
					this.$router.push('/login');
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});          
				});
			}
		},
		created() {
			this.getSelfInforList();
		}
	}
</script>

<style scoped="scoped">
	.teacher, .el-container {
	  height: 100%;
	}
	.el-header {
		border-bottom: 1px solid #E6E6E6;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* color: #fff; */
		font-size: 22px;
	}
	.el-aside {
		border-right: 1px solid #E6E6E6;
		transition: 0.5s;
	}
	.foldbtn {
		width: 100%;
		border-radius: 0;
	}
	.el-menu {
	  border: none;
	}
</style>
