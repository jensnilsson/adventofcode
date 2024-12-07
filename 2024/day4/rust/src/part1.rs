use std::{
    fs::File,
    io::{BufReader, Lines},
};

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum XMAS {
    X,
    M,
    A,
    S,
    BLANK,
}

const PATTERNS: [[(i64, i64); 3]; 8] = [
    [(0, 1), (0, 2), (0, 3)],       // right
    [(1, 1), (2, 2), (3, 3)],       // right down
    [(1, 0), (2, 0), (3, 0)],       // down
    [(1, -1), (2, -2), (3, -3)],    // left down
    [(0, -1), (0, -2), (0, -3)],    // left
    [(-1, -1), (-2, -2), (-3, -3)], // left up
    [(-1, 0), (-2, 0), (-3, 0)],    // up
    [(-1, 1), (-2, 2), (-3, 3)],    // right up
];

pub fn execute(lines: Lines<BufReader<File>>) {
    let matrix: Vec<Vec<XMAS>> = lines
        .map(|line| {
            let line = line.unwrap();
            let vec_xmas = line
                .chars()
                .map(|char| match char {
                    'X' => XMAS::X,
                    'M' => XMAS::M,
                    'A' => XMAS::A,
                    'S' => XMAS::S,
                    _ => XMAS::BLANK,
                })
                .collect();
            vec_xmas
        })
        .collect();

    for line in &matrix {
        //println!("{:?}", line);
    }

    let mut sum: usize = 0;

    let mut row_index = 0;
    let mut column_index = 0;

    for line in &matrix {
        for char in line {
            if char == &XMAS::X {
                let xmas_count_for_x = PATTERNS
                    .iter()
                    .filter_map(|pattern| {
                        let mut part_index = 0;
                        for part in pattern {
                            let row_part = (row_index + part.0) as usize;
                            let row_vec = matrix.get(row_part);

                            if let Some(row) = row_vec {
                                let column_part = (column_index + part.1) as usize;
                                let value = row.get(column_part);

                                let search_for = match part_index {
                                    0 => XMAS::M,
                                    1 => XMAS::A,
                                    2 => XMAS::S,
                                    _ => XMAS::BLANK,
                                };

                                match value {
                                    Some(value) => {
                                        if value != &search_for {
                                            return None;
                                        }
                                    }
                                    _ => return None,
                                }

                                part_index += 1
                            } else {
                                return None;
                            }
                        }
                        Some(())
                    })
                    .count();
                //println!("matches for x: {xmas_count_for_x}, {row_index}, {column_index}");
                sum += xmas_count_for_x;
            }
            column_index = column_index + 1;
        }
        column_index = 0;
        row_index = row_index + 1;
    }

    println!("sum: {sum}");
}
