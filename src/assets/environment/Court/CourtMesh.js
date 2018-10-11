import { Object3D, PlaneBufferGeometry, MeshBasicMaterial, Mesh } from 'three';


const COURT_TEAM_ONE_COLOR = 0x445463;
const COURT_TEAM_TWO_COLOR = 0x446353;
const COURT_LINES_COLOR = 0x2B2F37;

function CourtMesh(COURT_SIZE_WIDTH, COURT_SIZE_HEIGHT) {
    const court_team_size_height = COURT_SIZE_HEIGHT;
    const court_team_size_width = COURT_SIZE_WIDTH / 2;
    
    //Wrapper
    var Court = new Object3D();
    var teamOneCourt = new Object3D();
    teamOneCourt.name = "COURT_TEAM_ONE_FLOOR";
    var teamTwoCourt = new Object3D();
    teamTwoCourt.name = "COURT_TEAM_TWO_FLOOR";
    var courtLines = new Object3D();
    courtLines.name = "COURT_LINES";

    //Team1
    const team_one_geometry = new PlaneBufferGeometry(court_team_size_width, court_team_size_height);
    const team_one_material = new MeshBasicMaterial({ color: COURT_TEAM_ONE_COLOR });
    const team_one_mesh = new Mesh(team_one_geometry, team_one_material);
    team_one_mesh.name = "TEAM_ONE_FLOOR_MESH";
    teamOneCourt.add(team_one_mesh);
    teamOneCourt.position.set(court_team_size_width / 2, 0, -1);

    //Team2
    const team_two_geometry = new PlaneBufferGeometry(court_team_size_width, court_team_size_height);
    const team_two_material = new MeshBasicMaterial({ color: COURT_TEAM_TWO_COLOR });
    const team_two_mesh = new Mesh(team_two_geometry, team_two_material);
    team_one_mesh.name = "TEAM_TWO_FLOOR_MESH";
    teamTwoCourt.add(team_two_mesh);
    teamTwoCourt.position.set(-court_team_size_width / 2, 0, -1);


    //LINES
    var line_anchor = 5;
    var auxHeightPos = (COURT_SIZE_HEIGHT / 2) - 2.5;
    var auxWidthPos = court_team_size_width - 2.5;
    //TOP
    var court_lines_material = new MeshBasicMaterial({ color: COURT_LINES_COLOR });
    var court_lines_geometry_top = new PlaneBufferGeometry(COURT_SIZE_WIDTH, line_anchor);
    const court_lines_mesh_top = new Mesh(court_lines_geometry_top, court_lines_material);
    court_lines_mesh_top.name = "COURT_LINES_TOP_MESH";
    court_lines_mesh_top.position.set(0, auxHeightPos, -0.9);
    courtLines.add(court_lines_mesh_top);
    //BOTTOM
    var court_lines_geometry_bottom = new PlaneBufferGeometry(COURT_SIZE_WIDTH, line_anchor);
    const court_lines_mesh_bottom = new Mesh(court_lines_geometry_bottom, court_lines_material);
    court_lines_mesh_bottom.name = "COURT_LINES_BOTTOM_MESH";
    court_lines_mesh_bottom.position.set(0, -auxHeightPos, -0.9);
    courtLines.add(court_lines_mesh_bottom);
    //LEFT
    var court_lines_geometry_left = new PlaneBufferGeometry(line_anchor, COURT_SIZE_HEIGHT );
    const court_lines_mesh_left = new Mesh(court_lines_geometry_left, court_lines_material);
    court_lines_mesh_left.name = "COURT_LINES_LEFT_MESH";
    court_lines_mesh_left.position.set(-auxWidthPos, 0, -0.9);
    courtLines.add(court_lines_mesh_left);
    //RIGHT
    var court_lines_geometry_right = new PlaneBufferGeometry(line_anchor, COURT_SIZE_HEIGHT );
    const court_lines_mesh_right = new Mesh(court_lines_geometry_right, court_lines_material);
    court_lines_mesh_right.name = "COURT_LINES_RIGHT_MESH";
    court_lines_mesh_right.position.set(auxWidthPos, 0, -0.9);
    courtLines.add(court_lines_mesh_right);
    //MID
    var court_lines_geometry_mid = new PlaneBufferGeometry(line_anchor, COURT_SIZE_HEIGHT );
    const court_lines_mesh_mid = new Mesh(court_lines_geometry_mid, court_lines_material);
    court_lines_mesh_mid.name = "COURT_LINES_MID_MESH";
    court_lines_mesh_mid.position.set(0, 0, -0.9);
    courtLines.add(court_lines_mesh_mid);


    //Adding both team courts to the wrapper
    Court.add(teamOneCourt);
    Court.add(teamTwoCourt);
    Court.add(courtLines);


    //Setting position to the scene
    Court.position.set(0, 0, -1);

    return Court;
};

export { CourtMesh }