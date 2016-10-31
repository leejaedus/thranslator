import React from 'react';
import { connect } from 'react-redux';
import styles from './IndexPage.css';
import classnames from 'classnames';

class Index extends React.Component {
  render() {
    return (
      <div className="fullScreen">
        <div className={styles.left}>
          <div className={styles.box}>
            <div className="middleOuter">
              <div className="middle">
                <div className={styles.boxHeader}>프로젝트 생성</div>
                <div className={styles.boxContent}>새로운 공동 번역 작업을 시작합니다</div>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className="middleOuter">
              <div className="middle">
                <div className={styles.boxHeader}>기존 프로젝트 불러오기</div>
                <div className={styles.boxContent}>진행중이던 프로젝트 폴더를 불러옵니다</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={classnames(styles.boxLightHeader, styles.mb)}>최근 작업한 프로젝트</div>
        </div>
      </div>
    )
  }
}

export default connect()(Index);
