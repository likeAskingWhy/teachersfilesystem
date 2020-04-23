<template>
	<div class="learnfileinfor">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>档案管理</el-breadcrumb-item>
		  <el-breadcrumb-item><span style="font-weight: bold;">学术档案信息</span></el-breadcrumb-item>
		</el-breadcrumb>
		<el-table :data="learnInforList" style="width: 678px">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="教师编号：">
							<span>{{ props.row.teacherid }}</span>
						</el-form-item>
						<el-form-item label="姓名：">
							<span>{{ props.row.name }}</span>
						</el-form-item>
						<el-form-item label="题目：">
							<span>{{ props.row.topic }}</span>
						</el-form-item>
						<el-form-item label="起草日期：">
							<span>{{ props.row.createdate }}</span>
						</el-form-item>
						<el-form-item label="合作者：">
							<span>{{ props.row.partner }}</span>
						</el-form-item>
						<el-form-item label="小组组长：">
							<span>{{ props.row.teamleader }}</span>
						</el-form-item>
						<el-form-item label="发表日期：">
							<span>{{ props.row.publishdate }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="#" prop="id" width="70px"></el-table-column>
			<el-table-column label="教师编号" prop="teacherid" width="120px"></el-table-column>
			<el-table-column label="教师姓名" prop="name" width="120px"></el-table-column>
			<el-table-column label="题目" prop="topic" width="160px"></el-table-column>
			<el-table-column label="起草日期" prop="createdate" width="160px"></el-table-column>
		</el-table>
		<el-button type="primary" @click="addDialogVisible = true">编辑</el-button>
		
		<!-- 编辑消息的对话框 -->
		<el-dialog title="编辑个人信息" :visible.sync="addDialogVisible" width="30%">
			<!-- 内容主体区 -->
		  <el-form :model="learnFileInforObj" ref="selfinforForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="teacherid">
				  <el-input v-model="learnFileInforObj.teacherid"></el-input>
				</el-form-item>
				<el-form-item label="教师姓名">
				  <el-input v-model="learnFileInforObj.name"></el-input>
				</el-form-item>
		    <el-form-item label="题目">
		      <el-input v-model="learnFileInforObj.topic"></el-input>
		    </el-form-item>
		    <el-form-item label="起草日期">
		      <el-input v-model="learnFileInforObj.createdate"></el-input>
		    </el-form-item>
		    <el-form-item label="合作者">
		      <el-input v-model="learnFileInforObj.partner"></el-input>
		    </el-form-item>
		    <el-form-item label="小组组长">
		      <el-input v-model="learnFileInforObj.teamleader"></el-input>
		    </el-form-item>
		    <el-form-item label="发表日期">
		      <el-input v-model="learnFileInforObj.publishdate"></el-input>
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
		name: 'Learnfileinfor',
		data() {
			return {
				learnInforList: [],
				addDialogVisible: false,
				learnFileInforObj: {},
			}
		},
		methods: {
			getSelfInforList() {
				this.$http.get('learnfileinfor').then(res => {
					this.learnInforList = res.data;
					this.learnFileInforObj = res.data[0];
					// console.log(res.data);
				})
			},
			resetform() {
				this.$refs.selfinforForm.resetFields();
			},
			submitform() {
				this.addDialogVisible = false;
				let newSelfInfor = {
					teacherid: this.learnFileInforObj.teacherid,
					name: this.learnFileInforObj.name,
					topic: this.learnFileInforObj.topic,
					createdate: this.learnFileInforObj.createdate,
					partner: this.learnFileInforObj.partner,
					teamleader: this.learnFileInforObj.teamleader,
					publishdate: this.learnFileInforObj.publishdate
				}
				this.$http.put('learnfileinfor/' + this.learnFileInforObj.id, newSelfInfor).then(res => {
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

