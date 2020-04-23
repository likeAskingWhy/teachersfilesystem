<template>
	<div class="personalinforadm">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>信息管理</el-breadcrumb-item>
		  <el-breadcrumb-item><span style="font-weight: bold;">教师基本信息管理</span></el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-row :gutter="20">
		  <el-col :span="4">
				<div class="grid-content bg-purple">
					<el-input placeholder="请输入关键字查询信息" v-model="queryInfor"></el-input>
				</div>
			</el-col>
		  <el-col :span="2">
				<div class="grid-content bg-purple">
					<el-button style="width: 100%;" type="primary" icon="el-icon-search" @click="searchInfor">搜索信息</el-button>
				</div>
			</el-col>
		  <el-col :span="2">
				<div class="grid-content bg-purple">
					<el-button style="width: 100%;" type="success" icon="el-icon-plus" @click="addDialogVisible2 = true;">添加信息</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 表格展示数据 -->
		<el-table :data="personalInforList.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 788px">
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
			<el-table-column label="操作" width="170px">
				<template slot-scope="scope">
					<el-button size="small" type="primary" @click="getCurrentInfor(scope.row.id)">编辑</el-button>
					<el-button size="small" type="danger" @click="delCurrentInfor(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 设置分页效果 -->
		<el-pagination
		  @size-change="handleSizeChange"
		  @current-change="handleCurrentChange"
		  :current-page="currentPage"
		  :page-sizes="[5,8, 10, 20]"
		  :page-size="pagesize"
		  layout="total, sizes, prev, pager, next, jumper"
		  :total="personalInforList.length">
		</el-pagination>
		
		<!-- 编辑信息的对话框 -->
		<el-dialog title="编辑信息" :visible.sync="addDialogVisible" width="30%">
			<!-- 内容主体区 -->
		  <el-form :model="personalInforObj" :rules="selfinforRules" ref="selfinforForm" label-width="100px" class="demo-ruleForm">
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
		    <el-button @click="addDialogVisible = false">取消</el-button>
		    <el-button type="primary" @click="submitform">确定</el-button>
				<el-button type="danger" @click="resetform">重置</el-button>
		  </span>
		</el-dialog>
		
		<!-- 添加信息的对话框 -->
		<el-dialog title="添加信息" :visible.sync="addDialogVisible2" width="30%">
			<!-- 内容主体区 -->
		  <el-form :model="addNewPersonalInforList" :rules="selfinforRules" ref="selfinforForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="username">
				  <el-input v-model="addNewPersonalInforList.username"></el-input>
				</el-form-item>
		    <el-form-item label="教师编号" prop="teacherid">
		      <el-input v-model="addNewPersonalInforList.teacherid" maxlength="6"></el-input>
		    </el-form-item>
				<el-form-item label="教师姓名" prop="name">
				  <el-input v-model="addNewPersonalInforList.name"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
				  <el-input v-model="addNewPersonalInforList.sex" maxlength="1"></el-input>
				</el-form-item>
				<el-form-item label="出生日期" prop="birthdate">
				  <el-col :span="10">
				    <el-date-picker type="date" placeholder="请选择您的出生日期" v-model="addNewPersonalInforList.birthdate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="dateChangebirthday2" style="width: 100%;"></el-date-picker>
				  </el-col>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
				  <el-input v-model="addNewPersonalInforList.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
				  <el-input v-model="addNewPersonalInforList.email"></el-input>
				</el-form-item>
		  </el-form>
			<!-- 底部按钮区域 -->
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addDialogVisible2 = false">取消</el-button>
		    <el-button type="primary" @click="addinforform">确定</el-button>
				<el-button type="danger" @click="resetform">重置</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		name: 'Personalinforadm',
		data() {
			return {
				addNewPersonalInforList: {		// 添加基本信息的对象
					username: '',
					teacherid: '',
					name: '',
					sex: '',
					birthdate: '',
					phone: '',
					email: ''
				},
				queryInfor: '',
				personalInforList: [],		// 获取后台数据
				personalInforObj: {},		// 后台获取的单个对象
				addDialogVisible: false,		// 显示对话框的参数
				addDialogVisible2: false,		// 显示对话框的参数
				currentPage: 1,		// 分页设置，当前页
				pagesize: 10,		// 分页设置，默认显示10条数据
				selfinforRules: {		// 表单验证规则
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					teacherid: [
						{ required: true, message: '请输入教师编号', trigger: 'blur' },
						{ min: 6, max: 6, message: '编号为6个字符', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在 2 到 5个字符', trigger: 'blur' }
					],
					sex: [
						{ required: true, message: '请输入性别：男或女', trigger: 'blur' }
					],
					birthdate: [
						{ required: true, message: '请选择出生日期', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ min: 11, max: 11, message: '手机号为11个字符长度', trigger: 'blur' }
					],
					email: [
						{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
					]
				}
			}
		},
		methods: {
			// 获取后台数据
			getPersonalInforList() {
				this.$http.get('personalinforadm').then(res => {
					this.personalInforList = res.data;
				})
			},
			// 获取每一行的数据
			getCurrentInfor(id) {
				this.addDialogVisible = true;
				this.$http.get('personalinforadm/' + id).then(res => {
					this.personalInforObj = res.data
				})
			},
			// 分页效果
			handleSizeChange(size) {
			  this.pagesize = size;
			},
			handleCurrentChange(currentPage) {
			  this.currentPage = currentPage;
			},
			// 重置表单
			resetform() {
				this.$refs.selfinforForm.resetFields();
			},
			/* 格式化日期-出生日期*/
			dateChangebirthday1(val) {
			  this.personalInforObj.birthdate = val;
			},
			dateChangebirthday2(val) {
			  this.addNewPersonalInforList.birthdate = val;
			},
			// 提交修改信息表单
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
				this.$http.put('personalinforadm/' + this.personalInforObj.id, newSelfInfor).then(res => {
					this.getPersonalInforList();
				})
			},
			// 提交添加信息表单
			addinforform() {
				this.$http.post('personalinforadm', this.addNewPersonalInforList).then(res => {
					this.addDialogVisible2 = false;
					
					this.getPersonalInforList();
				})
			},
			// 删除信息表单
			delCurrentInfor(id) {
				this.$confirm('此操作将删除该信息且无法找回, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.delete('personalinforadm/' + id).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getPersonalInforList();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			// 查询信息
			searchInfor() {
				this.personalInforList = [];
				this.$http.get('personalinforadm').then(res => {
				  res.data.filter(i => {
						if (i.name.match(this.queryInfor) || i.teacherid.match(this.queryInfor) || i.sex.match(this.queryInfor) || i.phone.match(this.queryInfor)) {
				      return this.personalInforList.push(i)
				    }
				  })
				})
			}
		},
		created() {
			this.getPersonalInforList();
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
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 4px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>
