import CultivationTeamTable from '@/components/cultivations/CultivationTeamTable';

export default function CultivationTeam({ params }: { params: { cultivationId: string } }) {
  return <CultivationTeamTable cultivationId={params.cultivationId} />;
}
