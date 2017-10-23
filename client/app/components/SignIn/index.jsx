import React from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import {Link} from 'react-router-dom'
import {backendUrl} from '../../config/urlConfig'
import local from '../../utils/localStore'
import {TOKEN, USERNAME} from '../../constants/localStorage'
import {message} from 'antd'
import axios from '../../axios/index'

const FormItem = Form.Item;

class SignInForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const url = `${backendUrl}/sign-in/`
        axios.post(url, JSON.stringify({
          username: values.username,
          password: values.password
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          message.success('登录成功!')
          local.setItem(TOKEN, response.data.token)
          local.setItem(USERNAME, values.username)
          this.props.history.push('/')
        }).catch((error) => {
          console.log(error)
        })
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14}
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }
    return (
      <Form onSubmit={this.handleSubmit} id="sign-in-form">
        <FormItem
          {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{required: true, message: '请输入用户名!'}]
          })(
            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请输入密码!'}]
          })(
            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="密码"/>
          )}
        </FormItem>
        <FormItem
          {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="submit">
            登录
          </Button>
          Or <Link to="/user/sign-up">马上注册!</Link>
        </FormItem>
      </Form>
    )
  }

  componentDidMount() {
    const url = `${backendUrl}/verify/`
    axios.post(url, {
      token: local.getItem(TOKEN)
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        this.props.history.push('/')
      }
    }).catch(err => {
    })
  }
}

const SignIn = Form.create()(SignInForm)
export default SignIn