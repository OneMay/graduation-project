<template>
  <div class="content-width-right content-flex">
    <Card style="width:50%">
      <Form ref="formValidate1" :model="formValidate1" :label-width="80">
        <FormItem label="添加成员" prop="teamMember">
          <Select
            v-model="formValidate1.teamMember"
            placeholder="Select your teamMember"
            :multiple="true"
            :filterable="true"
            style="width:60%;float:left"
          >
            <Option
              v-for="item in userList"
              :value="item.mobile"
              :key="item._id"
              ><Icon type="md-person" />{{ item.mobile }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="wfloat:left"
            @click="handleSubmit1('formValidate1')"
            :disabled="disabledAdd"
            >Submit</Button>
        </FormItem>
      </Form>
      <Form ref="formValidate2" :model="formValidate2" :label-width="80">
        <FormItem label="移除成员" prop="teamMember">
          <Select
            v-model="formValidate2.teamMember"
            placeholder="Select your teamMember"
            :multiple="true"
            :filterable="true"
            style="width:60%;float:left"
          >
            <Option v-for="item in memberList" :value="item" :key="item"
              ><Icon type="md-person" />{{ item }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="wfloat:left"
            @click="handleSubmit2('formValidate2')"
            :disabled="disabledDel"
            >Submit</Button
          >
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import Fetcher from "../../../assets/fetcher";
export default {
  name: "TeamAdd",
  data() {
    return {
      formValidate1: {
        teamMember: []
      },
      formValidate2: {
        teamMember: []
      },
      userList: [],
      memberList: [],
      newMemberList: [],
      disabledDel:false,
      disabledAdd:false
    };
  },
  methods: {
    handleSubmit2(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formValidate2.teamMember.length > 0) {
            Fetcher.postEventViewData({
              action: "成员管理",
              category: "移除成员"
            });
            this.newMemberList = this.memberList.filter(v => {
              return !this.formValidate2.teamMember.includes(v);
            });
            this.disabledAdd=true;
            this.updateMemberUser();
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleSubmit1(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formValidate1.teamMember.length > 0) {
            Fetcher.postEventViewData({
              action: "成员管理",
              category: "添加成员"
            });
            this.disabledDel = true;
            this.newMemberList = JSON.parse(JSON.stringify(this.memberList));
            this.newMemberList= this.newMemberList.concat(this.formValidate1.teamMember);
            this.updateMemberUser();
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    async updateMemberUser() {
      let params = {
        teamEn: this.$store.getters.getTeam.teamEn,
        mobile: this.$store.getters.getUser,
        member: this.newMemberList
      };
      let data = await Fetcher.updateMemberUser(this, params);
      if (data.code === 200) {
        this.formValidate1.teamMember=[];
        this.formValidate2.teamMember=[];
        this.disabledDel=false;
        this.disabledAdd = false;
        this.findMemberUser();
      } else {
        this.$Message.error(data.message);
      }
    },
    async findMemberUser() {
      let params = {
        teamEn: this.$store.getters.getTeam.teamEn,
        mobile: this.$store.getters.getUser
      };
      let data = await Fetcher.getMemberUser(this, params);
      if (data.code === 200) {
        this.memberList = data.data;
        this.findNoMemberUser();
      } else {
        this.$Message.error(data.message);
      }
    },
    async findNoMemberUser() {
      let params = {
        teamEn: this.$store.getters.getTeam.teamEn,
        mobile: this.$store.getters.getUser,
        member: this.memberList
      };
      let data = await Fetcher.getNoMemberUser(this, params);
      if (data.code === 200) {
        this.userList = data.data;
      } else {
        this.$Message.error(data.message);
      }
    }
  },
  created() {
    this.findMemberUser();
  }
};
</script>
<style scoped>
.content-flex {
  justify-content: center;
}
</style>
