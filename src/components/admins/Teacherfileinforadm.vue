<template>
	<div class="teacherfileinforadm">
		<!-- 顶部面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>档案管理</el-breadcrumb-item>
		  <el-breadcrumb-item><span style="font-weight: bold;">教师档案信息列表</span></el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 输入框、按钮 -->
		<el-row :gutter="20">
		  <el-col :span="4">
				<div class="grid-content bg-purple">
					<el-input placeholder="请输入关键字查询信息" v-model="queryInfor" clearable></el-input>
				</div>
			</el-col>
		  <el-col :span="2">
				<div class="grid-content bg-purple">
					<el-button style="width: 100%;" type="primary" icon="el-icon-search" @click="searchInfor">搜索档案</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div class="grid-content bg-purple">
					<el-button style="width: 100%;" type="success" icon="el-icon-plus" @click="createInfor">添加档案</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 教师信息列表 -->
		<el-table :data="teacherFileInforList.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 848px">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="教师编号：">
							<span>{{ props.row.teacherid }}</span>
						</el-form-item>
						<el-form-item label="姓名：">
							<span>{{ props.row.name }}</span>
						</el-form-item>
						<el-form-item label="性别：">
							<span>{{ props.row.sex }}</span>
						</el-form-item>
						<el-form-item label="身份证号：">
							<span>{{ props.row.idnumber }}</span>
						</el-form-item>
						<el-form-item label="籍贯：">
							<span>{{ props.row.nativeplace }}</span>
						</el-form-item>
						<el-form-item label="政治面貌：">
							<span>{{ props.row.politicsstatus }}</span>
						</el-form-item>
						<el-form-item label="更多信息：">
							<span> 请点击右侧详情 </span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="#" prop="id" width="70px"></el-table-column>
			<el-table-column label="教师编号" prop="teacherid" width="120px"></el-table-column>
			<el-table-column label="教师姓名" prop="name" width="120px"></el-table-column>
			<el-table-column label="性别" prop="sex" width="90px"></el-table-column>
			<el-table-column label="身份证号" prop="idnumber" width="210px"></el-table-column>
			<el-table-column label="操作" width="190px">
				<template slot-scope="scope">
					<el-button size="small" @click="getDetailInfor(scope.row.id)">详情</el-button>
					<el-button size="small" type="danger" @click="delAllInfor(scope.row.id, scope.row)">删除</el-button>
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
		  :total="teacherFileInforList.length">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'Teacherfileinforadm',
		data() {
			return {
				queryInfor: '',		// 获取搜索框关键字
				teacherFileInforList: [],		// 基本档案信息
				currentPage: 1,		// 分页设置，当前页
				pagesize: 10,		// 分页设置，默认显示10条数据
			}
		},
		methods: {
			// 获取本地教师档案列表
			getTeacherFileInforList() {
				this.$http.get('teacherfileinforadm').then(res => {
					this.teacherFileInforList = res.data;
				})
			},
			// 查询功能
			searchInfor() {
				this.teacherFileInforList = [];
				this.$http.get('teacherfileinforadm').then(res => {
				  res.data.filter(i => {
						if (i.name.match(this.queryInfor) || i.teacherid.match(this.queryInfor) || i.sex.match(this.queryInfor) || i.phone.match(this.queryInfor)) {
				      return this.teacherFileInforList.push(i)
				    }
				  })
				})
			},
			// 查看档案信息
			getDetailInfor(id) {
				this.$router.push({ path: '/admin/teacherfiledetails/' + id, query: { 'id': id }})
			},
			// 添加信息
			createInfor() {
				this.$router.push('/admin/teacherfilenewinfor');
			},
			// 删除信息
			delAllInfor(id, row) {
				// console.log(id);
				this.$confirm('此操作会将信息放入回收站, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.delete('teacherfileinforadm/' + id).then(res => {
						this.$message({
							type: 'success',
							message: '已放入回收站!'
						});
						this.$http.post('recyclebin', row).then(res => {
							console.log('已放入回收站')
						})
						this.getTeacherFileInforList()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			// 分页效果
			handleSizeChange(size) {
			  this.pagesize = size;
			},
			handleCurrentChange(currentPage) {
			  this.currentPage = currentPage;
			},
		},
		created() {
			this.getTeacherFileInforList();
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
		width: 50%;
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
