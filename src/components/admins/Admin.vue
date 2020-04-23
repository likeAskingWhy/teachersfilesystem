<template>
	<div class="admin">
		
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
					  <el-menu-item index="1" :index="personalinforadmpath">
							<i class="el-icon-warning-outline"></i>
							<span slot="title">信息管理</span>
						</el-menu-item>
						<el-menu-item index="2" :index="teacherfileinforadm">
							<i class="el-icon-folder-opened"></i>
							<span slot="title">档案管理</span>
						</el-menu-item>
						<el-submenu index="3">
						  <template slot="title">
						    <i class="el-icon-setting"></i>
						    <span slot="title">系统管理</span>
						  </template>
							<el-menu-item index="3-1" :index="alterpasswordadmpath">修改密码</el-menu-item>
						  <el-menu-item index="3-2" :index="teacherfilerecylebinpath">档案回收</el-menu-item>
						  <el-menu-item index="3-3" :index="systemsettingspath">系统设置</el-menu-item>
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
		name: 'Admin',
		data() {
			return {
				isCollapse: false,
				personalinforadmpath: '/admin/personalinforadm',
				alterpasswordadmpath: '/admin/alterpasswordadm',
				teacherfileinforadm: '/admin/teacherfileinforadm',
				systemsettingspath: '/admin/systemsettings',
				teacherfilerecylebinpath: '/admin/teacherfilerecylebin'
			}
		},
		methods: {
			fold() {
				this.isCollapse = !this.isCollapse;
			},
			 handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
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
		
	}
</script>

<style scoped="scoped">
	.admin, .el-container {
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
