<template>
	<div class="login">
		<el-card class="box-card">
		  <img src="../assets/img/fly.png" />
			<div class="input-form">
				
				<h2 style="text-align: center; margin-top: 40px; margin-bottom: 30px; font-family: '宋体';">欢迎回来!</h2>
				<el-form ref="loginformrefs" :model="loginForm" label-width="0px" class="login_form">
				  <!-- 用户名 -->
				  <el-form-item>
				    <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" clearable v-model="loginForm.username"></el-input>
				  </el-form-item>
				  <!-- 密码 -->
				  <el-form-item>
				    <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" clearable show-password type="password" v-model="loginForm.password"></el-input>
				  </el-form-item>
				
				  <!-- 单选框 -->
				  <el-radio v-model="identity" label="teacher">教师</el-radio>
				  <el-radio v-model="identity" label="admin">管理员</el-radio>
					
				</el-form>
				<div class="btn-form">
					<el-button type="primary" style="width: 100%;" @click="enter">登录</el-button>
					<el-button type="danger" style="width: 100%;">重置</el-button>
				</div>
				<div class="divider">
					<el-divider></el-divider>
					<p style="text-align: center; font-size: 15px; font-family: '微软雅黑';">起航一中教师档案管理平台</p>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				loginForm: {
					username: 'teacher',
					password: ''
				},
				identity: '',
				userPassword: '',
				adminPassword: ''
			}
		},
		methods: {
			getEnterPassword() {
				this.$http.get('userinfor').then(res => {
					this.userPassword = res.data[0].userpassword;
				})
				this.$http.get('admininfor').then(res => {
					this.adminPassword = res.data[0].adminpassword;
				})
			},
			enter() {
				if (this.identity === 'teacher') {
					if (this.loginForm.username === 'teacher' && this.loginForm.password === this.userPassword) {
						this.$message.success('验证成功！亲爱的老师，欢迎回来~');
						this.$router.push('/teacher/personalinfor')
					} else {
						this.$message.error('验证失败，请重新登录。');
					}
				} else if(this.identity === 'admin') {
					if (this.loginForm.username === 'admin' && this.loginForm.password === this.adminPassword) {
						this.$message.success('验证成功！亲爱的管理员，欢迎回来~');
						this.$router.push('/admin/personalinforadm')
					} else {
						this.$message.error('验证失败，请重新登录。');
					}
				} else {
					this.$message.error('验证失败，请选择您的登录身份。');
				}
			}
		},
		created() {
			this.getEnterPassword();
		}
	}
</script>

<style scoped="scoped">
	.login {
		height: 100%;
		background-color: #409EFF;
	}
	.box-card {
		width: 810px;
		height: 460px;
		padding: 0;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.box-card img {
		border-radius: 5px;
	}
	.input-form {
		width: 300px;
		height: 420px;
		position: absolute;
		right: 20px;
		top: 20px;
	}
	 
	.login_form {
		 position: absolute;
		 top: 90px;
		 width: 100%;
		 padding: 0 20px;
		 box-sizing: border-box;
	}
	.el-form-item {
		margin-bottom: 15px;
	}
	.btn-form {
	  width: 260px;
		height: 85px;
		padding: 0 20px;
		position: absolute;
		top: 225px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.divider {
		width: 260px;
		height: 100px;
		padding: 0 20px;
		position: absolute;
		top: 290px;
		right: 0;
	}
	
</style>
