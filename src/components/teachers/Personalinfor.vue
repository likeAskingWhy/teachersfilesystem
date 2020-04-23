<template>
	<div class="personalinfor">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>档案管理</el-breadcrumb-item>
		  <el-breadcrumb-item><span style="font-weight: bold;">个人基本信息</span></el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-table :data="personalInforlist" style="width: 658px">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="用户名：">
							<span>{{ props.row.username }}</span>
						</el-form-item>
						<el-form-item label="教师编号：">
							<span>{{ props.row.teacherid }}</span>
						</el-form-item>
						<el-form-item label="姓名：">
							<span>{{ props.row.name }}</span>
						</el-form-item>
						<el-form-item label="性别：">
							<span>{{ props.row.sex }}</span>
						</el-form-item>
						<el-form-item label="出生日期：">
							<span>{{ props.row.birthdate }}</span>
						</el-form-item>
						<el-form-item label="手机号：">
							<span>{{ props.row.phone }}</span>
						</el-form-item>
						<el-form-item label="邮箱：">
							<span>{{ props.row.email }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="#" prop="id" width="70px"></el-table-column>
			<el-table-column label="教师编号" prop="teacherid" width="120px"></el-table-column>
			<el-table-column label="教师姓名" prop="name" width="120px"></el-table-column>
			<el-table-column label="性别" prop="sex" width="90px"></el-table-column>
			<el-table-column label="联系方式" prop="phone" width="170px"></el-table-column>
		</el-table>
		<el-button type="primary" @click="addDialogVisible = true">编辑</el-button>
		
		<!-- 编辑消息的对话框 -->
		<el-dialog title="编辑个人信息" :visible.sync="addDialogVisible" width="30%">
			<!-- 内容主体区 -->
		  <el-form :model="personalInforObj" ref="selfinforForm" label-width="100px" class="demo-ruleForm">
		    <el-form-item label="用户名" prop="username">
		      <el-input v-model="personalInforObj.username" disabled></el-input>
		    </el-form-item>
		    <el-form-item label="教师编号" prop="teacherid">
		      <el-input v-model="personalInforObj.teacherid" maxlength="6"></el-input>
		    </el-form-item>
		    <el-form-item label="教师姓名" prop="name">
		      <el-input v-model="personalInforObj.name"></el-input>
		    </el-form-item>
		    <el-form-item label="性别" prop="sex">
		      <el-input v-model="personalInforObj.sex" maxlength="1"></el-input>
		    </el-form-item>
		    <el-form-item label="出生日期" prop="birthdate">
		      <el-col :span="10">
		        <el-date-picker type="date" placeholder="请选择您的出生日期" v-model="personalInforObj.birthdate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="dateChangebirthday1" style="width: 100%;"></el-date-picker>
		      </el-col>
		    </el-form-item>
		    <el-form-item label="手机号" prop="phone">
		      <el-input v-model="personalInforObj.phone"></el-input>
		    </el-form-item>
		    <el-form-item label="邮箱" prop="email">
		      <el-input v-model="personalInforObj.email"></el-input>
		    </el-form-item>
		  </el-form>
			<!-- 底部按钮区域 -->
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitform">确 定</el-button>
				<el-button type="danger" @click="resetform">重 置</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Personalinfor',
		data() {
			return {
				personalInforlist: [],
				addDialogVisible: false,
				personalInforObj: {},
			}
		},
		methods: {
			getSelfInforList() {
				this.$http.get('personalinfor').then(res => {
					this.personalInforlist = res.data;
					this.personalInforObj = res.data[0];
					// console.log(res.data);
				})
			},
			resetform() {
				this.$refs.selfinforForm.resetFields();
			},
			/* 格式化日期-出生日期*/
			dateChangebirthday1(val) {
			  this.personalInforObj.birthdate = val;
			},
			submitform() {
				this.addDialogVisible = false;
				let newSelfInfor = {
					username: this.personalInforObj.username,
					teacherid: this.personalInforObj.teacherid,
					name: this.personalInforObj.name,
					sex: this.personalInforObj.sex,
					birthdate: this.personalInforObj.birthdate,
					phone: this.personalInforObj.phone,
					email: this.personalInforObj.email,
				}
				this.$http.put('personalinfor/' + this.personalInforObj.id, newSelfInfor).then(res => {
					// console.log(res.data);
					this.getSelfInforList();
				})
			}
		},
		created() {
			this.getSelfInforList();
		}
	}
</script>

<style scoped="scoped">
	/* 面包屑留出下外边距 */
	.el-breadcrumb {
		margin-bottom: 20px;
	}
	.el-table {
		border-top: 1px solid #EBEEF5;
		margin-bottom: 20px;
	}
	.demo-table-expand {
		font-size: 0;
		color: #409EFF;
	}
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 100%;
		margin-left: 10px;
	}
</style>
