from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError

import logging

LOGGER = logging.getLogger(__name__)

MYSQL_CONNECT_LOCAL = 'mysql+pymysql://root:password@localhost/crawl_data?charset=utf8'


class OjProblem(object):
    def __init__(self):
        self._db_engine = create_engine(MYSQL_CONNECT_LOCAL, pool_size=20, max_overflow=200, echo=False)
        self._db_meta = MetaData(self._db_engine)
        self._db_session = sessionmaker(self._db_engine)
        self._auto_map_base = automap_base()
        self._auto_map_base.metadata.reflect(self._db_engine, only=['oj_problem'])
        self._auto_map_base.prepare()

        self._weibo_info_table = self._auto_map_base.classes['oj_problem']

    @staticmethod
    def commit(session):
        try:
            session.commit()
        except SQLAlchemyError as exception:
            LOGGER.error(str(exception))
        finally:
            session.close()

    def item_existed(self, item):
        session = self._db_session()
        title = item['title']
        query = session.query(self._weibo_info_table.title)
        query = query.filter(self._weibo_info_table.title == title)

        if query.first():
            LOGGER.info('exist item: %s' % item['url'])
            return True
        return False

    def insert(self, item):
        if self.item_existed(item):
            return

        session = self._db_session()
        oj_problem = self._weibo_info_table()
        oj_problem.title = item['title']
        oj_problem.url = item['url']
        oj_problem.content = item['content']
        oj_problem.example = item['example']
        session.add(oj_problem)
        self.commit(session)
        LOGGER.info('insert title: %s' % item['title'])