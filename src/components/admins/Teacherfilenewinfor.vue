<template>
	<div class="teacherfilenewinfor">
		<!-- 顶部面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>档案管理</el-breadcrumb-item>
			<el-breadcrumb-item>教师档案信息列表</el-breadcrumb-item>
			<el-breadcrumb-item><span style="font-weight: bold;">添加档案</span></el-breadcrumb-item>
		</el-breadcrumb>
		<!-- tab栏切换 -->
		<el-tabs v-model="activeName" style="width: 978px">
			<el-tab-pane label="基本档案" name="first">
				<el-form ref="basicFileInforRule" :model="basicFileInfor" label-width="80px" style="width: 50%;">
				  <el-form-item label="教师编号">
				    <el-input v-model="basicFileInfor.teacherid"></el-input>
				  </el-form-item>
					<el-form-item label="姓名">
					  <el-input v-model="basicFileInfor.name"></el-input>
					</el-form-item>
					<el-form-item label="性别">
					  <el-input v-model="basicFileInfor.sex"></el-input>
					</el-form-item>
					<el-form-item label="民族">
					  <el-input v-model="basicFileInfor.nation"></el-input>
					</el-form-item>
					<el-form-item label="身份证号">
					  <el-input v-model="basicFileInfor.idnumber"></el-input>
					</el-form-item>
					<el-form-item label="籍贯">
					  <el-input v-model="basicFileInfor.nativeplace"></el-input>
					</el-form-item>
					<el-form-item label="政治面貌">
					  <el-input v-model="basicFileInfor.politicsstatus"></el-input>
					</el-form-item>
					<el-form-item label="学校职务">
					  <el-input v-model="basicFileInfor.duty"></el-input>
					</el-form-item>
					<el-form-item label="学历">
					  <el-input v-model="basicFileInfor.education"></el-input>
					</el-form-item>
					<el-form-item label="毕业学校">
					  <el-input v-model="basicFileInfor.graduation"></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="科研档案" name="second">
				<el-form ref="basicFileInforRule" :model="basicFileInfor" label-width="80px" :disabled="isDisabled" style="width: 50%;">
				  <el-form-item label="研究课题">
				    <el-input v-model="basicFileInfor.research"></el-input>
				  </el-form-item>
					<el-form-item label="教改建议">
					  <el-input v-model="basicFileInfor.suggestion"></el-input>
					</el-form-item>
					<el-form-item label="发表论文">
					  <el-input v-model="basicFileInfor.thesis"></el-input>
					</el-form-item>
					<el-form-item label="专著">
					  <el-input v-model="basicFileInfor.monograph"></el-input>
					</el-form-item>
					<el-form-item label="同行评价">
					  <el-input v-model="basicFileInfor.appraise"></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="学术档案" name="third">
				<el-form ref="basicFileInforRule" :model="basicFileInfor" label-width="80px" :disabled="isDisabled" style="width: 50%;">
				  <el-form-item label="题目">
				    <el-input v-model="basicFileInfor.topic"></el-input>
				  </el-form-item>
					<el-form-item label="开始日期">
					  <el-input v-model="basicFileInfor.createdate"></el-input>
					</el-form-item>
					<el-form-item label="合作者">
					  <el-input v-model="basicFileInfor.partner"></el-input>
					</el-form-item>
					<el-form-item label="小组长">
					  <el-input v-model="basicFileInfor.teamleader"></el-input>
					</el-form-item>
					<el-form-item label="发表日期">
					  <el-input v-model="basicFileInfor.publishdate"></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="教学档案" name="fourth">
				<el-form ref="basicFileInforRule" :model="basicFileInfor" label-width="80px" :disabled="isDisabled" style="width: 50%;">
				  <el-form-item label="教学科目">
				    <el-input v-model="basicFileInfor.teachsubject"></el-input>
				  </el-form-item>
					<el-form-item label="教学经历">
					  <el-input v-model="basicFileInfor.teachingexp"></el-input>
					</el-form-item>
					<el-form-item label="所获荣誉">
					  <el-input v-model="basicFileInfor.gethonor"></el-input>
					</el-form-item>
					<el-form-item label="教学目标">
					  <el-input v-model="basicFileInfor.teachtarget"></el-input>
					</el-form-item>
					<el-form-item label="教学规划">
					  <el-input v-model="basicFileInfor.teachplan"></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
		<el-button type="success" @click="submitFile">提交</el-button>
		<el-button type="infor" @click="backList">返回</el-button>
	</div>
</template>

<script>
	export default {
		name: 'Teacherfilenewinfor',
		data() {
			return {
				activeName:'first',
				basicFileInfor: {}
			}
		},
		methods: {
			// 提交按钮
			submitFile() {
				this.$http.post('teacherfileinforadm', this.basicFileInfor).then(res => {
					this.$router.push('/admin/teacherfileinforadm');
				})
			},
			// 返回按钮
			backList() {
				this.$router.push('/admin/teacherfileinforadm')
			},
		}
	}
</script>

<style scoped="scoped">
	/* 面包屑留出下外边距 */
	.el-breadcrumb {
		margin-bottom: 20px;
	}
</style>
