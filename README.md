# react-jira

# 初始化项目

`npx create-react-app my-app --template typescript`

# 项目配置

## 绝对路径使用配置

```js
// tsconfig.json
"baseUrl": "./src"
```

## [配置 prettier](https://prettier.io/docs/en/install.html)

`yarn add --dev --exact prettier`

`echo {}> .prettierrc.json`

创建`.prettierignore`文件

处理和 ESLint 的冲突：

`yarn add --dev eslint-config-prettier`

![](Images/2022-03-19-22-59-46.png)

Git hooks:

```js
yarn add --dev husky lint-staged

npx husky install
npm set-script prepare "husky install"
npx husky add .husky/pre-commit "npx lint-staged"

```
