<template>
  <div class="content-width-right content-flex">
    <Card style="width:50%">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="团队中文名" prop="teamZn">
          <Input
            v-model="formValidate.teamZn"
            placeholder="Enter your teamZn"
          ></Input>
        </FormItem>
        <FormItem label="团队英文名" prop="teamEn">
          <Input
            v-model="formValidate.teamEn"
            placeholder="Enter your teamEn"
          ></Input>
        </FormItem>
        <FormItem label="域名" prop="domainName">
          <Input
            v-model="formValidate.domainName"
            placeholder="Enter your domain name"
          ></Input>
        </FormItem>

        <FormItem label="其他团队成员" prop="teamMember">
          <Select
            v-model="formValidate.teamMember"
            placeholder="Select your teamMember"
            :multiple="true"
            :filterable="true"
          >
            <Option  v-for="item in userList" :value="item.mobile" :key="item._id"><Icon type="md-person" />{{item.mobile}}</Option>
  
          </Select>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')"
            >Submit</Button
          >
          <Button @click="handleReset('formValidate')" style="margin-left: 8px"
            >Reset</Button
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
      formValidate: {
        teamZn: "",
        teamEn: "",
        domainName: "",
        teamMember: []
      },
      ruleValidate: {
        teamZn: [
          {
            required: true,
            message: "The teamZn cannot be empty",
            trigger: "blur"
          }
        ],
        teamEn: [
          {
            required: true,
            message: "teamZn cannot be empty",
            trigger: "blur"
          },
          {
            type: "string",
            required: true,
            pattern: /^[a-zA-Z]+$/,
            trigger: "blur"
          }
        ],
        domainName: [
          {
            required: true,
            message: "Please select the domainName",
            trigger: "change"
          },
          { type: "url", message: "Incorrect url format", trigger: "blur" }
        ]
      },
      userList:[]
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Fetcher.postEventViewData({
            action: "团队操作",
            category: "创建团队"
          });
          let params = JSON.parse(JSON.stringify(this.formValidate));
          params.mobile = this.$store.getters.getUser;
          (async function(ctx) {
            let data = await Fetcher.teamAdd(ctx, params);
            if (data.code === 200) {
              ctx.$Message.success("添加成功");
              this.handleReset();
            } else {
              ctx.$Message.error(data.message);
            }
          })(this);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    async findAllUser() {
      let params = {
        mobile: this.$store.getters.getUser
      };
      let data = await Fetcher.findAllUser(this, params);
      if (data.code === 200) {
       this.userList=data.data;
      } else {
        this.$Message.error(data.message);
      }
    }
  },
  created() {
    this.findAllUser.call(this);
  }
};
</script>
<style scoped>
.content-flex {
  justify-content: center;
}
</style>
