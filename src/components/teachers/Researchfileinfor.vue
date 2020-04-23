<template>
	<div class="researchfileinfor">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>档案管理</el-breadcrumb-item>
		  <el-breadcrumb-item><span style="font-weight: bold;">科研档案信息</span></el-breadcrumb-item>
		</el-breadcrumb>
		<el-table :data="researchInforlist" style="width: 678px">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="教师编号：">
							<span>{{ props.row.teacherid }}</span>
						</el-form-item>
						<el-form-item label="姓名：">
							<span>{{ props.row.name }}</span>
						</el-form-item>
						<el-form-item label="研究课题：">
							<span>{{ props.row.research }}</span>
						</el-form-item>
						<el-form-item label="教改建议：">
							<span>{{ props.row.suggestion }}</span>
						</el-form-item>
						<el-form-item label="发表论文：">
							<span>{{ props.row.thesis }}</span>
						</el-form-item>
						<el-form-item label="专著：">
							<span>{{ props.row.monograph }}</span>
						</el-form-item>
						<el-form-item label="同行评价：">
							<span>{{ props.row.appraise }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="#" prop="id" width="70px"></el-table-column>
			<el-table-column label="教师编号" prop="teacherid" width="120px"></el-table-column>
			<el-table-column label="教师姓名" prop="name" width="120px"></el-table-column>
			<el-table-column label="研究课题" prop="research" width="160px"></el-table-column>
			<el-table-column label="教改建议" prop="suggestion" width="160px"></el-table-column>
		</el-table>
		<el-button type="primary" @click="addDialogVisible = true">编辑</el-button>
		
		<!-- 编辑消息的对话框 -->
		<el-dialog title="编辑个人信息" :visible.sync="addDialogVisible" width="30%">
			<!-- 内容主体区 -->
		  <el-form :model="researchFileInforObj" ref="selfinforForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="teacherid">
				  <el-input v-model="researchFileInforObj.teacherid"></el-input>
				</el-form-item>
				<el-form-item label="教师姓名">
				  <el-input v-model="researchFileInforObj.name"></el-input>
				</el-form-item>
		    <el-form-item label="研究课题">
		      <el-input v-model="researchFileInforObj.research"></el-input>
		    </el-form-item>
		    <el-form-item label="教改建议">
		      <el-input v-model="researchFileInforObj.suggestion"></el-input>
		    </el-form-item>
		    <el-form-item label="发表论文">
		      <el-input v-model="researchFileInforObj.thesis"></el-input>
		    </el-form-item>
		    <el-form-item label="专著">
		      <el-input v-model="researchFileInforObj.monograph"></el-input>
		    </el-form-item>
		    <el-form-item label="同行评价">
		      <el-input v-model="researchFileInforObj.appraise"></el-input>
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
		name: 'Researchfileinfor',
		data() {
			return {
				researchInforlist: [],
				addDialogVisible: false,
				researchFileInforObj: {},
			}
		},
		methods: {
			getSelfInforList() {
				this.$http.get('researchfileinfor').then(res => {
					this.researchInforlist = res.data;
					this.researchFileInforObj = res.data[0];
					// console.log(res.data);
				})
			},
			resetform() {
				this.$refs.selfinforForm.resetFields();
			},
			submitform() {
				this.addDialogVisible = false;
				let newSelfInfor = {
					teacherid: this.researchFileInforObj.teacherid,
					name: this.researchFileInforObj.name,
					research: this.researchFileInforObj.research,
					suggestion: this.researchFileInforObj.suggestion,
					thesis: this.researchFileInforObj.thesis,
					monograph: this.researchFileInforObj.monograph,
					appraise: this.researchFileInforObj.appraise
				}
				this.$http.put('researchfileinfor/' + this.researchFileInforObj.id, newSelfInfor).then(res => {
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
