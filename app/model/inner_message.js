module.exports = app => {
  const { INTEGER, STRING, TINYINT, UUIDV4, UUID, BOOLEAN } = app.Sequelize;

  const Schema = app.model.define('inner_message', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    uid: {
      type: INTEGER,
      allowNull: false,
    },
    content: {
      type: STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    type: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '消息类型, 0=系统消息'
    },
    hasRead: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否已读'
    }
  }, {
    underscored: true,
    comment: '站内消息',
    charset: 'utf8mb4',
    engine: 'InnoDB'
  });

  return Schema;
};
