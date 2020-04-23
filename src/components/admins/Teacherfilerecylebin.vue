<template>
	<div class="teacherfilerecylebin">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>系统管理</el-breadcrumb-item>
		  <el-breadcrumb-item><span style="font-weight: bold;">教师档案回收站</span></el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 教师信息列表 -->
		<el-table :data="recyleBinFileInforList.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 848px">
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
							<span> 还原此条数据查看更多内容 </span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="序号" prop="id" width="70px"></el-table-column>
			<el-table-column label="教师编号" prop="teacherid" width="120px"></el-table-column>
			<el-table-column label="教师姓名" prop="name" width="120px"></el-table-column>
			<el-table-column label="性别" prop="sex" width="90px"></el-table-column>
			<el-table-column label="身份证号" prop="idnumber" width="210px"></el-table-column>
			<el-table-column label="操作" width="190px">
				<template slot-scope="scope">
					<el-button size="small" type="primary" @click="restoreInfor(scope.row.id, scope.row)">还原</el-button>
					<el-button size="small" type="danger" @click="delAllInfor(scope.row.id)">删除</el-button>
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
		  :total="recyleBinFileInforList.length">
		</el-pagination>
		
	</div>
</template>

<script>
	export default {
		name: 'Teacherfilerecylebin',
		data() {
			return {
				recyleBinFileInforList: [],		// 基本档案信息
				currentPage: 1,		// 分页设置，当前页
				pagesize: 10,		// 分页设置，默认显示10条数据
				restoredFileInforId: '', 		// 将要还原的数据的id
				restoredFileInfor: {},		// 将要还原的数据
			}
		},
		methods: {
			// 获取本地教师档案列表
			getRecyleBinFileInforList() {
				this.$http.get('recyclebin').then(res => {
					this.recyleBinFileInforList = res.data;
				})
			},
			// 还原档案
			restoreInfor(id,row) {
				this.$http.post('teacherfileinforadm', row).then(res => {
					console.log('success')
				});
				this.delAllInfor(id);
			},
			// 删除信息
			delAllInfor(id) {
				this.$confirm('还原和删除都将从此列表中删除这条数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.delete('recyclebin/' + id).then(res => {
						this.$message({
							type: 'success',
							message: '已经移除该条信息!'
						});
						this.getRecyleBinFileInforList()
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
			this.getRecyleBinFileInforList()
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
</style>
