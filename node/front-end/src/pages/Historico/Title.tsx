import React from 'react';
import Typography from '@material-ui/core/Typography';

interface TitleProps {
  children: any;
}

const Title: React.FC<TitleProps> = props => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props?.children}
    </Typography>
  );
};

export default Title;
