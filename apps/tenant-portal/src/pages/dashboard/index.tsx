import TenantDashboardLayout from "@/layouts/DashboardLayout";
import { Grid, Typography } from "@mui/material";

const TenantDashboard = () => {
  return (
    <TenantDashboardLayout>
      <Grid container>
        <Grid item>
          <Typography variant="h6">Welcome Blessing</Typography>
        </Grid>
      </Grid>
    </TenantDashboardLayout>
  )
}

export default TenantDashboard;