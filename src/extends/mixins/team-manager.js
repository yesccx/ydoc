export default {
    data() {
        return {
            teamId: 0
        };
    },
    created() {
        const teamId = this.$utils.Input('team_id/d', 0);
        if (teamId <= 0) {
            this.$utils.Error('缺少必要参数');
        }
        this.teamId = teamId;
    }
};