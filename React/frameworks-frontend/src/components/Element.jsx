import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

export default function Element(element) {

    const useStyles = makeStyles({
        root: {
          minWidth: 200,
          maxWidth: 400
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
      });
      const classes = useStyles();
      
    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <CardActionArea>
                    Image goes here
      <CardContent>
                        <Typography variant="h5" component="h2">
                            {element.name}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {element.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
