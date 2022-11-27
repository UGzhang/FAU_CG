
vec3 projectVertexToPlane(vec3 vertex, vec3 direction, vec3 pointOnPlane, vec3 planeNormal)
{
    // TODO 4.4 a)
    // Project 'vertex' on the plane defined by 'pointOnPlane' and 'planeNormal'.
    // The projection direction is given by 'direction'.

    //http://www.it.hiof.no/~borres/j3d/explain/shadow/p-shadow.html - calculateProjection

    float t = dot(planeNormal, pointOnPlane - vertex) / dot(planeNormal, direction);
    vec3 projectedPoint = vertex + t * direction;

    return projectedPoint;
}

