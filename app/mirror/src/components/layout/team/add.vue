<template>
  <div class="content-width-right content-flex" >
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
        >
          <Option value="beijing">New York</Option>
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
export default {
  name: "TeamAdd",
  data() {
    return {
      formValidate: {
        teamZn: "",
        teamEn: "",
        domainName: "",
        teamMember: ""
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
        ],
        teamMember: [
          { required: true, message: "Please select gender", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style scoped>
.content-flex{
    justify-content:center;
}
</style>
