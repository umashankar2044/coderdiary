
import { Container } from "react-bootstrap";
import { HeatmapLoading } from "./heatmap/HeatmapLoading";
import React from "react";
import { Row,Col} from "react-bootstrap";
import SkeletonLoader from "tiny-skeleton-loader-react";
export const Loader = () => {
  return (
        <div>
            <br/>
            <br/>
            <br/>
            <Container>
              <Row>
                  <Col>
                    <div>
                      <SkeletonLoader width="100%" height="10em"></SkeletonLoader>
                    </div>
                  </Col>
              </Row>
              <br/>
              <Row>
                  <Col>
                    <div>
                      <SkeletonLoader width="100%" height="10em"></SkeletonLoader>
                    </div>
                  </Col>
              </Row>
            </Container>
        </div>    
  )
}