class GameOfLife {
    constructor() {
        this.cell_size = 5;
        this.dead_color = `#181818`;
        this.alive_color = `#FF756B`;
        this.cells_in_column = Math.floor(canvas.width / this.cell_size);
        this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
        this.active_array = [];
        this.inactive_array = [];

        this.arrayInitialization = () => {
            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[(i * this.cells_in_rows) + j] = 0;
                }
            }
            this.inactive_array = this.active_array;

        };

        this.arrayRandomize = () => {
            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[(i * this.cells_in_rows) + j] = (Math.random() > 0.5) ? 1 : 0;
                }
            }

        };

        this.fillArray = () => {
            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let color;
                    if (this.active_array[(i * this.cells_in_rows) + j] == 1)
                        color = this.alive_color;
                    else
                        color = this.dead_color;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                }
            }

        };

        this.setCellValueHelper = (row, col) => {
            try {
                return this.active_array[(row * this.cells_in_rows) + col];
            }
            catch {
                return 0;
            }
        };

        this.countNeighbours = (row, col) => {
            let total_neighbours = 0;
            total_neighbours += this.setCellValueHelper(row - 1, col - 1);
            total_neighbours += this.setCellValueHelper(row - 1, col);
            total_neighbours += this.setCellValueHelper(row - 1, col + 1);
            total_neighbours += this.setCellValueHelper(row, col - 1);
            total_neighbours += this.setCellValueHelper(row, col + 1);
            total_neighbours += this.setCellValueHelper(row + 1, col - 1);
            total_neighbours += this.setCellValueHelper(row + 1, col);
            total_neighbours += this.setCellValueHelper(row + 1, col + 1);
            return total_neighbours;
        };

        this.updateCellValue = (row, col) => {

            const total = this.countNeighbours(row, col);
            // cell with more than 4 or less then 3 neighbours dies. 1 => 0; 0 => 0
            if (total > 4 || total < 3) {
                return 0;
            }
            // dead cell with 3 neighbours becomes alive. 0 => 1
            else if (this.active_array[(row * this.cells_in_rows) + col] === 0 && total === 3) {
                return 1;
            }
            // or returning its status back. 0 => 0; 1 => 1
            else {
                return this.active_array[(row * this.cells_in_rows) + col];
            }

        };

        this.updateLifeCycle = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let new_state = this.updateCellValue(i, j);
                    this.inactive_array[(i * this.cells_in_rows) + j] = new_state;
                }
            }
            this.active_array = this.inactive_array

        };

        this.gameSetUp = () => {
            this.arrayInitialization();
        };

        this.runGame = () => {
            this.updateLifeCycle();
            this.fillArray();
        };
        
    }
    // PLEASE READ: ANSWER SECTION FOR THE REST OF #1:
    /*
    Compared to the original Conway's Game of Life code, which used
    jagged arrays to run the game, using a single array to simulate a
    rectangular array drastically sped up runtime of the simulation. The
    reason this was happening is because in jagged arrays, there is much
    more time being spent reference hopping as you try to access the arrays 
    within another array(s). Since the game is visually changing relatively
    often, the reference hopping strains the game's runtime and slows it down.
    
    However, having a single array that allows quicker, simple access to its
    content removes the time spent reference hopping, freeing up more resources
    to visually update the game more quickly as well.
    */
    // END OF #1 ANSWER.
}
