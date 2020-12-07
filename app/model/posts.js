'use strict';

module.exports = app => {
  const { DataTypes, NOW, UUIDV4 } = app.Sequelize;
  const Posts = app.model.define('posts', {
    // 主键 默认自增
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // 创建两个具有相同值的对象将引发错误.
    // unique 属性可以是布尔值或字符串.
    // 如果为多个列提供相同的字符串,则它们将形成一个复合唯一键.
    // uniqueOne: { type: DataTypes.STRING, unique: 'compositeIndex' },
    // uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
    // unique 属性是创建唯一约束的简写.
    uuid: { type: DataTypes.UUID, unique: true, defaultValue: UUIDV4 }, // 或 Sequelize.UUIDV1
    // 将 allowNull 设置为 false 将为该列添加 NOT NULL,
    // 这意味着如果该列为 null,则在执行查询时将从数据库引发错误.
    // 如果要在查询数据库之前检查值是否不为 null,请查看下面的验证部分.
    title: { type: DataTypes.STRING(255), allowNull: false, comment: '标题' },
    content: { type: DataTypes.TEXT('tiny'), defaultValue: '', comment: '内容' }, // TINYTEXT

    // 实例化将自动将 flag 设置为 true (如果未设置)
    flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    // 日期的默认值 => 当前时间 你可以通过 'field' 属性指定自定义列名称：
    lastUpdateTime: { type: DataTypes.DATE, defaultValue: NOW, field: 'last_update_time' },
    // 可以创建外键：
    authorId: {
      type: DataTypes.INTEGER,
      field: 'author_id',
      // references: {
      //   // 这是对另一个模型的参考
      //   // model: 'User',
      //   table: 'users',
      //   // 这是引用模型的列名
      //   key: 'id',
      //   // 使用 PostgreSQL,可以通过 Deferrable 类型声明何时检查外键约束.
      //   // deferrable: Deferrable.INITIALLY_IMMEDIATE
      //   // 参数:
      //   // - `Deferrable.INITIALLY_IMMEDIATE` - 立即检查外键约束
      //   // - `Deferrable.INITIALLY_DEFERRED` - 将所有外键约束检查推迟到事务结束
      //   // - `Deferrable.NOT` - 完全不推迟检查(默认) - 这将不允许你动态更改事务中的规则
      //   // 将外键的 onDelete 设置成了 cascade，这导致外键删除时，它所有的引用都被清空了，而项目的预期是，当父级评论删除时，所有回复依然需要保留。
      //   // onDelete: 'cascade',
      // },
    },
  }, {
    timestamps: false,
    // 在上面的属性中使用 `unique: true` 与在模型的参数中创建索引完全相同：
    // indexes: [{ unique: true, fields: [ 'uuid' ] }],
  });

  Posts.associate = function() {
    app.model.Posts.belongsTo(app.model.User, { as: 'author' });
  };

  return Posts;
};
