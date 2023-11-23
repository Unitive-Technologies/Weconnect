import React from 'react';
import { Link } from 'react-router-dom';
import { size, map } from "lodash";

const Name = (cell) => {
    return cell.value ? cell.value : '';
};

const Email = (cell) => {
    return cell.value ? cell.value : '';
};

const Tags = (cell) => {
    return (
        <>
            {map(
                cell.value,
                (tag, index) =>
                    index < 2 && (
                        <Link
                            to="#"
                            className="badge badge-soft-primary font-size-11 m-1"
                            key={"_skill_" + cell.value + index}
                        >
                            {tag}
                        </Link>

                    )
            )}
            {size(cell.value) > 2 && (
                <Link
                    to="#"
                    className="badge badge-soft-primary font-size-11 m-1"
                    key={"_skill_" + cell.value}
                >
                    {size(cell.value) - 1} + more
                </Link>
            )}
        </>
    );
};

const Projects = (cell) => {
    return cell.value ? cell.value : '';
};

const Img = (cell) => {
    return (
        <>
            {!cell.value ? (
                <div className="avatar-xs">
                    <span className="avatar-title rounded-circle">                        
                        {cell.data[0].name.charAt(0)}
                    </span>
                </div>
            ) : (
                <div>
                    <img
                        className="rounded-circle avatar-xs"
                        src={cell.value}
                        alt=""
                    />
                </div>
            )}
        </>
    );
};

export {
    Name,
    Email,
    Tags,
    Projects,
    Img
};