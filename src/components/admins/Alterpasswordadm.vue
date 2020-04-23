<template>
	<div class="alterpasswordadm">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>系统管理</el-breadcrumb-item>
		  <el-breadcrumb-item><span style="font-weight: bold;">修改登录密码</span></el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-form style="width: 400px;" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="旧密码" prop="oldpass">
			  <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
			</el-form-item>
		  <el-form-item label="新密码" prop="newpass">
		    <el-input type="password" v-model="ruleForm.newpass" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'Alterpasswordadm',
		data() {
			var validateOldPass = (rule, value, callback) => {
			 	if (value === '') {
			 		callback(new Error('请输入旧密码'));
			 	} else if (value !== this.inputOldPass){
			 		callback(new Error('旧密码输入不正确'));
			 	} else {
					callback();
				}
			};
			var validateNewPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入新密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validateCheckPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入新密码'));
				} else if (value !== this.ruleForm.newpass) {
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			}
			return {
				admininforid: '',
				inputOldPass: '',
				ruleForm: {
					oldpass: '',
					newpass: '',
					checkPass: '',
				},
				rules: {
					oldpass: [
						{ validator: validateOldPass, trigger: 'blur'}
					],
					newpass: [
						{ validator: validateNewPass, trigger: 'blur' }
					],
					checkPass: [
						{ validator: validateCheckPass, trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$confirm('修改密码后需要重新登录，您确定要保存吗？', '确认信息', {
							distinguishCancelAndClose: true,
							confirmButtonText: '保存',
							cancelButtonText: '放弃修改'
						}).then(() => {
								let newPassword = {
									adminpassword: this.ruleForm.newpass
								}
								this.$http.put('admininfor/' + this.admininforid, newPassword).then(res => {
									this.$message({
										type: 'info',
										message: '密码已修改，请重新登录！'
									});
									this.$router.push('/login');
								})
							}).catch(action => {
								this.$message({
									type: 'info',
									message: action === 'cancel'
										? '已放弃修改密码'
										: '停留在当前页面'
								})
							});
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getOldPassword() {
				this.$http.get('admininfor').then(res => {
					this.inputOldPass = res.data[0].adminpassword;
					this.admininforid = res.data[0].id;
				})
			}
		},
		created() {
			this.getOldPassword();
		}
	}
</script>

<style scoped="scoped">
	/* 面包屑留出下外边距 */
	.el-breadcrumb {
		margin-bottom: 20px;
	}
</style>
